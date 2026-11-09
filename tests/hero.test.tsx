import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Hero } from '../src';
import { html } from './helpers';

test('Hero: es una sección con el titular como h1', () => {
  const out = html(<Hero title="Software que encaja con tu negocio" />);
  assert.match(out, /^<section /);
  assert.match(out, /<h1 class="pese-hero__title">Software que encaja con tu negocio<\/h1>/);
  assert.equal((out.match(/<h1/g) ?? []).length, 1);
});

test('Hero: titleAs="h2" cambia el nivel sin cambiar el aspecto', () => {
  const out = html(<Hero title="Título" titleAs="h2" />);
  assert.match(out, /<h2 class="pese-hero__title">/);
  assert.doesNotMatch(out, /<h1/);
});

test('Hero: sobretítulo, texto y acciones son opcionales', () => {
  const solo = html(<Hero title="Título" />);
  assert.doesNotMatch(solo, /pese-hero__eyebrow|pese-hero__text|pese-hero__actions|pese-hero__media/);
  const completo = html(
    <Hero title="Título" eyebrow="Sobre" actions={<a href="/x">Ir</a>}>
      Texto de apoyo
    </Hero>,
  );
  assert.match(completo, /<p class="pese-hero__eyebrow">Sobre<\/p>/);
  assert.match(completo, /<div class="pese-hero__text">Texto de apoyo<\/div>/);
  assert.match(completo, /<div class="pese-hero__actions"><a href="\/x">Ir<\/a><\/div>/);
});

test('Hero: el orden de lectura es sobretítulo, titular, texto y acciones; la imagen va al final', () => {
  const out = html(
    <Hero title="Título" eyebrow="Sobre" actions={<a href="/x">Ir</a>} media={<img src="/i.svg" alt="Ilustración" />}>
      Texto
    </Hero>,
  );
  const orden = ['Sobre', 'Título', 'Texto', 'Ir', 'Ilustración'].map((t) => out.indexOf(t));
  assert.deepEqual([...orden].sort((a, b) => a - b), orden);
});

test('Hero: con imagen lleva la clase de dos columnas; sin imagen no', () => {
  assert.match(html(<Hero title="T" media={<span>m</span>} />), /pese-hero--has-media/);
  assert.doesNotMatch(html(<Hero title="T" />), /pese-hero--has-media/);
});

test('Hero: tono por defecto plain y azul noche con deep', () => {
  assert.match(html(<Hero title="T" />), /pese-hero--plain/);
  assert.match(html(<Hero title="T" tone="deep" />), /pese-hero--deep/);
});
