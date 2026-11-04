import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// El script es JavaScript sin tipos: se importa de forma dinámica.
const { FONTS, fontFaceCss } = await import(new URL('../scripts/build-fonts.mjs', import.meta.url).href);
const tokens = JSON.parse(readFileSync(new URL('../tokens/tokens.json', import.meta.url), 'utf8'));

test('fuentes: hay un @font-face por cada familia de los tokens', () => {
  const css: string = fontFaceCss();
  for (const value of Object.values<string>(tokens.type.families)) {
    const family = value.split(',')[0].replace(/["']/g, '').trim();
    assert.ok(css.includes(`font-family: "${family}"`), `falta ${family}`);
  }
  assert.equal((css.match(/@font-face/g) ?? []).length, FONTS.length);
});

test('fuentes: rutas relativas, woff2 y font-display swap (sin pedir nada a Google)', () => {
  const css: string = fontFaceCss();
  assert.doesNotMatch(css, /https?:\/\/|googleapis|gstatic/);
  assert.equal((css.match(/url\("\.\/fonts\/[^"]+\.woff2"\) format\("woff2"\)/g) ?? []).length, FONTS.length);
  assert.equal((css.match(/font-display: swap/g) ?? []).length, FONTS.length);
});

test('fuentes: el subconjunto incluye ñ, tildes, ¿ y ¡', () => {
  // Latin-1 (U+0000-00FF) cubre á é í ó ú ñ ü ¿ ¡.
  assert.match(fontFaceCss(), /unicode-range: U\+0000-00FF/);
});
