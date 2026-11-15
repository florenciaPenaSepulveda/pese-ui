import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Breadcrumbs, CtaBand, Faq, JsonLd, Notice, breadcrumbListJsonLd, faqPageJsonLd } from '../src';
import { html } from './helpers';

test('Notice: dice el tipo con una palabra y deja pasar role', () => {
  assert.match(html(<Notice>Texto</Notice>), /pese-notice--info.*Información/);
  assert.match(html(<Notice tone="warn">T</Notice>), />Atención<\/p>/);
  assert.match(html(<Notice tone="danger">T</Notice>), />Error<\/p>/);
  const out = html(<Notice tone="ok" title="Mensaje enviado" role="status">T</Notice>);
  assert.match(out, /role="status"/);
  assert.match(out, /Mensaje enviado/);
  assert.doesNotMatch(out, />Listo</);
});

test('CtaBand: sección con título de nivel 2 y acciones', () => {
  const out = html(<CtaBand title="Hola" actions={<a href="/x">Ir</a>}>Texto</CtaBand>);
  assert.match(out, /^<section /);
  assert.match(out, /<h2 class="pese-heading pese-heading--xl">Hola<\/h2>/);
  assert.match(out, /<div class="pese-cta__actions"><a href="\/x">Ir<\/a><\/div>/);
  assert.match(out, /pese-cta--deep/);
});

test('CtaBand: titleLevel 3, tono tint y sin texto', () => {
  const out = html(<CtaBand title="Hola" titleLevel={3} tone="tint" actions={<a href="/x">Ir</a>} />);
  assert.match(out, /<h3 /);
  assert.match(out, /pese-cta--tint/);
  assert.doesNotMatch(out, /pese-cta__text/);
});

test('Breadcrumbs: nav con nombre, lista ordenada y página actual sin enlace', () => {
  const out = html(<Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Servicios', href: '/servicios' }, { label: 'Diagnóstico' }]} />);
  assert.match(out, /<nav [^>]*aria-label="Migas de pan"/);
  assert.match(out, /<ol /);
  assert.equal((out.match(/<a /g) ?? []).length, 2);
  assert.match(out, /<span class="pese-crumbs__current" aria-current="page">Diagnóstico<\/span>/);
  assert.equal((out.match(/aria-hidden="true">\//g) ?? []).length, 2);
});

test('Faq: details y summary, con la primera abierta si se pide', () => {
  const out = html(<Faq items={[{ question: 'P1', answer: 'R1', open: true }, { question: 'P2', answer: 'R2' }]} />);
  assert.equal((out.match(/<details /g) ?? []).length, 2);
  assert.match(out, /<details [^>]*open=""[^>]*><summary class="pese-faq__question">P1<\/summary>/);
  assert.doesNotMatch(out, /application\/ld\+json/);
});

test('Faq: schema agrega FAQPage con el texto de cada respuesta', () => {
  const out = html(<Faq schema items={[{ question: 'P1', answer: 'R1' }, { question: 'P2', answer: <p>R2</p>, answerText: 'R2 en texto' }, { question: 'P3', answer: <p>sin texto</p> }]} />);
  assert.match(out, /<script type="application\/ld\+json">/);
  const json = JSON.parse(out.match(/<script type="application\/ld\+json">(.*?)<\/script>/)![1]);
  assert.equal(json['@type'], 'FAQPage');
  assert.deepEqual(json.mainEntity.map((q: { name: string }) => q.name), ['P1', 'P2']);
  assert.equal(json.mainEntity[1].acceptedAnswer.text, 'R2 en texto');
});

test('JsonLd: escapa < para que el texto no cierre el script', () => {
  const out = html(<JsonLd data={{ text: '</script><b>' }} />);
  assert.doesNotMatch(out, /<\/script><b>/);
  assert.match(out, /\\u003c\/script>/);
});

test('breadcrumbListJsonLd y faqPageJsonLd: estructura schema.org', () => {
  const b = breadcrumbListJsonLd([{ name: 'Inicio', url: 'https://pese.cl/' }, { name: 'Servicios', url: 'https://pese.cl/servicios' }]) as any;
  assert.equal(b['@type'], 'BreadcrumbList');
  assert.deepEqual(b.itemListElement.map((i: { position: number }) => i.position), [1, 2]);
  assert.equal(b.itemListElement[1].item, 'https://pese.cl/servicios');
  const f = faqPageJsonLd([{ question: 'P', answer: 'R' }]) as any;
  assert.equal(f.mainEntity[0]['@type'], 'Question');
  assert.equal(f.mainEntity[0].acceptedAnswer['@type'], 'Answer');
});
