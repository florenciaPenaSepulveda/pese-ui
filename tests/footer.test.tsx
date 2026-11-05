import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Footer } from '../src';
import { html } from './helpers';

const groups = [
  { title: 'Servicios', links: [{ label: 'Diagnóstico', href: '/diagnostico' }, { label: 'Casos', href: '/casos' }] },
  { title: 'Recursos', links: [{ label: 'Blog', href: '/blog' }] },
];

test('Footer: es un footer con nav con nombre y un encabezado de nivel 2 por columna', () => {
  const out = html(<Footer groups={groups} />);
  assert.match(out, /^<footer /);
  assert.match(out, /<nav class="pese-footer__nav" aria-label="Pie de página">/);
  assert.equal((out.match(/<h2 /g) ?? []).length, 2);
  assert.equal((out.match(/<li>/g) ?? []).length, 3);
});

test('Footer: sin columnas no hay nav; sin texto legal no hay franja inferior', () => {
  const out = html(<Footer />);
  assert.doesNotMatch(out, /<nav/);
  assert.doesNotMatch(out, /pese-footer__bottom/);
  assert.doesNotMatch(out, /pese-footer__contact/);
});

test('Footer: la franja legal aparece con texto o con enlaces', () => {
  assert.match(html(<Footer legal="© PESE" />), /pese-footer__bottom/);
  assert.match(html(<Footer legalLinks={[{ label: 'Privacidad', href: '/privacidad' }]} />), /href="\/privacidad"/);
});

test('Footer: el contacto lleva su título y se puede renombrar', () => {
  const out = html(<Footer contact={<a href="mailto:contacto@pese.cl">contacto@pese.cl</a>} />);
  assert.match(out, /<h2 class="pese-footer__title">Contacto<\/h2>/);
  assert.match(html(<Footer contact="x" contactTitle="Escríbenos" />), />Escríbenos<\/h2>/);
});

test('Footer: el tono azul noche pone el logo en blanco y la clase de foco', () => {
  const out = html(<Footer tone="deep" />);
  assert.match(out, /pese-footer--deep/);
  assert.match(out, /pese-logo--white/);
  assert.match(html(<Footer />), /pese-footer--plain[^>]*>.*pese-logo--auto/s);
});

test('Footer: el logo es un enlace con nombre accesible, sin título duplicado', () => {
  const out = html(<Footer />);
  assert.match(out, /<a class="pese-footer__home" href="\/" aria-label="PESE, ir al inicio">/);
  assert.doesNotMatch(out, /<title>/);
});

test('Footer: no escribe el año por su cuenta (el texto legal lo pone quien lo usa)', () => {
  // Se ignora el SVG del logo: sus trazos tienen números que no son un año.
  const sinSvg = html(<Footer groups={groups} />).replace(/<svg[\s\S]*?<\/svg>/g, '');
  assert.doesNotMatch(sinSvg, /\b20\d\d\b/);
});
