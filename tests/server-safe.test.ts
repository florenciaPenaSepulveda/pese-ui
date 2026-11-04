import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

const FORBIDDEN = [
  /['"]use client['"]/,
  /\buse(State|Effect|LayoutEffect|Reducer|Ref|Context|Memo|Callback|Id|SyncExternalStore)\b/,
  /\b(window|document|localStorage|sessionStorage|navigator)\./,
];

test('ningún componente usa estado, efectos ni APIs del navegador (SSR sin estado)', () => {
  const src = files(fileURLToPath(new URL('../src', import.meta.url))).filter((f) => /\.tsx?$/.test(f));
  assert.ok(src.length > 0);
  for (const file of src) {
    const text = readFileSync(file, 'utf8');
    for (const rule of FORBIDDEN) {
      assert.ok(!rule.test(text), `${file} contiene ${rule}`);
    }
  }
});
