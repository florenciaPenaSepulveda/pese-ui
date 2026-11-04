import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Header } from '../src';
import { html } from './helpers';

const links = [
  { label: 'Servicios', href: '/servicios', current: true },
  { label: 'Blog', href: '/blog' },
];

test('Header: nav con nombre, menú con details/summary y enlaces en una lista', () => {
  const out = html(<Header links={links} />);
  assert.match(out, /^<header /);
  assert.match(out, /<nav class="pese-header__nav" aria-label="Principal">/);
  assert.match(out, /<details class="pese-header__menu"><summary class="pese-header__toggle">Menú<\/summary><ul/);
  assert.equal((out.match(/<li/g) ?? []).length, 2);
});

test('Header: el menú de pantalla chica viene cerrado, sin JavaScript', () => {
  assert.doesNotMatch(html(<Header links={links} />), /<details[^>]* open/);
});

test('Header: la página actual lleva aria-current y no depende solo del color', () => {
  const out = html(<Header links={links} />);
  assert.equal((out.match(/aria-current="page"/g) ?? []).length, 1);
  assert.match(out, /pese-header__link--current" href="\/servicios" aria-current="page"/);
});

test('Header: el logo es un enlace a la portada con nombre accesible y sin título duplicado', () => {
  const out = html(<Header links={links} />);
  assert.match(out, /<a class="pese-header__home" href="\/" aria-label="PESE, ir al inicio">/);
  assert.doesNotMatch(out, /<title>/);
});

test('Header: el botón de acción es un enlace dentro de la lista', () => {
  const out = html(<Header links={links} cta={{ label: 'Pedir diagnóstico', href: '/diagnostico-gratuito' }} />);
  assert.match(out, /<li class="pese-header__cta"><a [^>]*href="\/diagnostico-gratuito"[^>]*>Pedir diagnóstico<\/a><\/li>/);
  assert.equal((out.match(/<li/g) ?? []).length, 3);
});

test('Header: navLabel y menuLabel se pueden cambiar', () => {
  const out = html(<Header links={links} navLabel="Principal del sitio" menuLabel="Abrir menú" />);
  assert.match(out, /aria-label="Principal del sitio"/);
  assert.match(out, />Abrir menú<\/summary>/);
});
