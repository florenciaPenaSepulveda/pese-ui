import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Icon, Logo, Steps } from '../src';
import { html } from './helpers';

test('Steps: cada paso dice su estado con una palabra', () => {
  const out = html(
    <Steps items={[
      { title: 'Diagnóstico', status: 'done' },
      { title: 'Primer flujo', status: 'current' },
      { title: 'Mejoras', status: 'todo' },
    ]} />,
  );
  assert.match(out, /^<ol /);
  for (const w of ['Hecho', 'En curso', 'Pendiente']) assert.match(out, new RegExp(w));
  assert.equal((out.match(/<li /g) ?? []).length, 3);
});

test('Logo: accesible por defecto y decorativo con title={null}', () => {
  assert.match(html(<Logo />), /role="img" aria-label="PESE"/);
  assert.match(html(<Logo title={null} variant="mark" />), /aria-hidden="true"/);
  assert.match(html(<Logo variant="wordmark" />), /viewBox="0 0 119 35"/);
});

test('Icon: decorativo salvo que tenga label', () => {
  assert.match(html(<Icon name="conectar" />), /aria-hidden="true"/);
  assert.match(html(<Icon name="soporte" label="Soporte" size={32} />), /aria-label="Soporte"[^>]*|role="img"/);
});
