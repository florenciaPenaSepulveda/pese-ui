import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Card, LevelCard, LevelIndicator } from '../src';
import { html } from './helpers';

test('Card: usa el elemento pedido y la esquina grande', () => {
  const out = html(<Card as="section" tone="deep">Hola</Card>);
  assert.match(out, /^<section /);
  assert.match(out, /pese-card--deep/);
  assert.match(out, /pese-card--corner/);
});

test('LevelCard: escribe el nivel y la insignia es decorativa', () => {
  const out = html(<LevelCard level={1} title="Primer flujo" price="[Precio a definir]" featured />);
  assert.match(out, /Nivel 1/);
  assert.match(out, /pese-level-card--featured/);
  assert.match(out, /pese-level-card__badge" aria-hidden="true"/);
  assert.match(out, /\[Precio a definir\]/);
});

test('LevelIndicator: marca los tramos hasta el nivel y tiene aria-label', () => {
  const out = html(<LevelIndicator level={1} />);
  assert.match(out, /aria-label="Nivel 1 de 2"/);
  assert.equal((out.match(/pese-levels__step--on/g) ?? []).length, 2);
  assert.match(out, /Estás en el Nivel 1/);
});

test('LevelIndicator: label null oculta la frase', () => {
  assert.doesNotMatch(html(<LevelIndicator level={0} label={null} />), /Estás en/);
});
