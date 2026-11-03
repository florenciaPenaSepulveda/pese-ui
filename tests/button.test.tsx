import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Button } from '../src';
import { html } from './helpers';

test('Button: por defecto es <button type="button"> primario', () => {
  const out = html(<Button>Pedir diagnóstico</Button>);
  assert.match(out, /^<button /);
  assert.match(out, /type="button"/);
  assert.match(out, /pese-btn pese-btn--primary/);
  assert.match(out, />Pedir diagnóstico</);
});

test('Button: con href se pinta como enlace', () => {
  const out = html(<Button href="/niveles" variant="secondary">Ver niveles</Button>);
  assert.match(out, /^<a /);
  assert.match(out, /href="\/niveles"/);
  assert.doesNotMatch(out, /type="button"/);
});

test('Button: deshabilitado y cargando', () => {
  const out = html(<Button disabled loading>Enviando</Button>);
  assert.match(out, /disabled=""/);
  assert.match(out, /aria-busy="true"/);
  assert.match(out, /pese-btn__spinner/);
});

test('Button: tamaño lg y ancho completo', () => {
  const out = html(<Button size="lg" fullWidth variant="accent">Hablemos</Button>);
  assert.match(out, /pese-btn--lg/);
  assert.match(out, /pese-btn--block/);
  assert.match(out, /pese-btn--accent/);
});
