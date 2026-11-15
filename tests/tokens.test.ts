import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

type Pair = [fg: string, bg: string, min: number];
const tokens = JSON.parse(readFileSync(new URL('../tokens/tokens.json', import.meta.url), 'utf8'));
const color = (name: string, mode: 'light' | 'dark') =>
  tokens.color.tokens.find((c: { name: string }) => c.name === name).value[mode] as string;

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const lin = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
export function ratio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Texto: AAA (7:1).
const TEXT: Pair[] = [
  ['ink', 'surface-100', 7], ['ink', 'surface-200', 7], ['ink', 'surface-300', 7],
  ['ink-muted', 'surface-100', 7], ['ink-muted', 'surface-200', 7], ['ink-muted', 'surface-300', 7],
  ['brand-strong', 'surface-200', 7],
  ['brand-strong', 'surface-100', 7], ['brand-strong', 'surface-300', 7],
  ['danger', 'surface-100', 7], ['danger', 'surface-200', 7],
  ['on-brand', 'brand', 7], ['on-deep', 'deep', 7], ['on-acento', 'acento', 7],
  ['acento', 'deep', 7],
  ['ok', 'ok-bg', 7], ['warn', 'warn-bg', 7], ['danger', 'danger-bg', 7],
];
// Gráficos y bordes: 3:1.
const GRAPHICS: Pair[] = [
  ['line-strong', 'surface-100', 3], ['line-strong', 'surface-200', 3],
  ['brand', 'surface-100', 3], ['focus', 'surface-100', 3],
  // Sobre azul noche el foco usa on-deep (en tema claro, focus y deep son el mismo color).
  ['on-deep', 'deep', 3],
];

for (const mode of ['light', 'dark'] as const) {
  for (const [fg, bg, min] of [...TEXT, ...GRAPHICS]) {
    test(`${mode}: ${fg} sobre ${bg} ≥ ${min}:1`, () => {
      const r = ratio(color(fg, mode), color(bg, mode));
      assert.ok(r >= min, `${fg}/${bg} en ${mode} da ${r.toFixed(2)}:1`);
    });
  }
}
