import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Container, Layout } from '../src';
import { html } from './helpers';

test('Layout: cabecera, un solo main con id y pie, en ese orden', () => {
  const out = html(
    <Layout header={<header>Arriba</header>} footer={<footer>Abajo</footer>}>
      Contenido
    </Layout>,
  );
  assert.match(out, /pese-root pese-layout/);
  assert.equal((out.match(/<main /g) ?? []).length, 1);
  assert.match(out, /<main id="contenido" tabindex="-1" class="pese-layout__main">Contenido<\/main>/);
  assert.ok(out.indexOf('Arriba') < out.indexOf('Contenido'));
  assert.ok(out.indexOf('Contenido') < out.indexOf('Abajo'));
});

test('Layout: mainId cambia el destino del enlace de salto', () => {
  assert.match(html(<Layout mainId="principal">x</Layout>), /<main id="principal"/);
});

test('Layout: sin cabecera ni pie sigue siendo válido', () => {
  const out = html(<Layout>x</Layout>);
  assert.doesNotMatch(out, /<header|<footer/);
});

test('Container: ancho por defecto, tamaños y elemento a medida', () => {
  assert.match(html(<Container>x</Container>), /^<div class="pese-container pese-container--default">/);
  assert.match(html(<Container size="narrow">x</Container>), /pese-container--narrow/);
  assert.match(html(<Container as="section" size="wide">x</Container>), /^<section [^>]*pese-container--wide/);
});
