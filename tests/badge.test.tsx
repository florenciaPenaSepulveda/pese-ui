import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Badge, Status } from '../src';
import { html } from './helpers';

test('Badge: tono por defecto neutral', () => {
  assert.match(html(<Badge>Nuevo</Badge>), /pese-badge--neutral/);
});

test('Status: siempre lleva icono y palabra', () => {
  const out = html(<Status tone="ok" label="Conectado" />);
  assert.match(out, /<svg[^>]*aria-hidden="true"/);
  assert.match(out, /Conectado/);
  assert.match(out, /pese-status--ok/);
});
