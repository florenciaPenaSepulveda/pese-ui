import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ArticleCard, ContactForm, LevelsTable, Pagination } from '../src';
import { html } from './helpers';

test('ContactForm: formulario que envía a action y funciona sin JavaScript', () => {
  const out = html(<ContactForm action="/api/contacto" privacyHref="/privacidad" />);
  assert.match(out, /^<form /);
  assert.match(out, /action="\/api\/contacto"/);
  assert.match(out, /method="post"/);
  assert.match(out, /type="submit"/);
});

test('ContactForm: campos obligatorios y opcionales con autocompletado', () => {
  const out = html(<ContactForm action="/x" privacyHref="/p" />);
  for (const name of ['nombre', 'correo', 'mensaje', 'consentimiento']) {
    assert.match(out, new RegExp(`<(input|textarea) [^>]*name="${name}"[^>]*required=""|<(input|textarea) [^>]*required=""[^>]*name="${name}"`));
  }
  assert.match(out, /autoComplete="email"|autocomplete="email"/);
  assert.match(out, /\(opcional\)/);
  assert.doesNotMatch(out, /<select /);
});

test('ContactForm: el rubro aparece solo si se pasan opciones', () => {
  const out = html(<ContactForm action="/x" privacyHref="/p" rubros={[{ value: 'a', label: 'Comercio' }]} />);
  assert.match(out, /<select [^>]*name="rubro"/);
  assert.match(out, />Comercio<\/option>/);
});

test('ContactForm: el consentimiento enlaza a la política de privacidad', () => {
  assert.match(html(<ContactForm action="/x" privacyHref="/privacidad" />), /<a [^>]*href="\/privacidad"[^>]*>política de privacidad<\/a>/);
});

test('ContactForm: el campo trampa va oculto para lectores y fuera del orden de tabulación', () => {
  const out = html(<ContactForm action="/x" privacyHref="/p" />);
  assert.match(out, /<div class="pese-form__trap" aria-hidden="true">/);
  assert.match(out, /tabindex="-1"/i);
});

test('ContactForm: con errores muestra el resumen con enlaces y el error en cada campo', () => {
  const out = html(<ContactForm action="/x" privacyHref="/p" errors={{ correo: 'Falta la @', mensaje: 'Escribe algo' }} />);
  assert.match(out, /Revisa estos campos/);
  assert.match(out, /<a href="#contacto-correo">Correo: Falta la @<\/a>/);
  assert.match(out, /<a href="#contacto-mensaje">Mensaje: Escribe algo<\/a>/);
  assert.match(out, /id="contacto-correo-error"/);
  assert.match(out, /role="alert"/);
});

test('ContactForm: sin errores no hay resumen; status ok se anuncia como status', () => {
  const sin = html(<ContactForm action="/x" privacyHref="/p" />);
  assert.doesNotMatch(sin, /Revisa estos campos/);
  const ok = html(<ContactForm action="/x" privacyHref="/p" status={{ tone: 'ok', title: 'Mensaje enviado', message: 'Gracias' }} />);
  assert.match(ok, /role="status"/);
  assert.match(ok, /Mensaje enviado/);
});

test('ContactForm: values rellena los campos e idPrefix cambia los id', () => {
  const out = html(<ContactForm action="/x" privacyHref="/p" idPrefix="cta" values={{ nombre: 'Flor', consentimiento: 'on' }} />);
  assert.match(out, /id="cta-nombre"/);
  assert.match(out, /value="Flor"/);
  assert.match(out, /<input [^>]*id="cta-consentimiento"[^>]*checked=""|<input [^>]*checked=""[^>]*id="cta-consentimiento"/);
});

test('ArticleCard: un solo enlace (el título) y encabezado de nivel 3 por defecto', () => {
  const out = html(<ArticleCard href="/blog/a" title="Título" excerpt="Resumen" category="Gestión" date="2026-11-09" dateLabel="9 de noviembre de 2026" readingTime="5 min de lectura" />);
  assert.match(out, /^<article /);
  assert.equal((out.match(/<a /g) ?? []).length, 1);
  assert.match(out, /<h3 [^>]*><a class="pese-article__link" href="\/blog\/a">Título<\/a><\/h3>/);
  assert.match(out, /<time datetime="2026-11-09">9 de noviembre de 2026<\/time>/i);
  assert.match(out, /5 min de lectura/);
  assert.match(out, /Gestión/);
});

test('ArticleCard: titleLevel y piezas opcionales', () => {
  const out = html(<ArticleCard href="/x" title="T" titleLevel={2} />);
  assert.match(out, /<h2 /);
  assert.doesNotMatch(out, /pese-article__excerpt|pese-article__meta|pese-article__media|pese-badge/);
  assert.match(html(<ArticleCard href="/x" title="T" image={<img alt="" src="/i.jpg" />} />), /pese-article__media/);
});

test('Pagination: con una página o menos no dibuja nada', () => {
  assert.equal(html(<Pagination current={1} total={1} hrefTemplate="/p/{page}" />), '');
});

test('Pagination: nav con nombre, página actual marcada y enlaces con la plantilla', () => {
  const out = html(<Pagination current={4} total={12} hrefTemplate="/blog?pagina={page}" />);
  assert.match(out, /<nav [^>]*aria-label="Paginación"/);
  assert.match(out, /aria-current="page" aria-label="Página 4, actual">4<\/span>/);
  assert.match(out, /href="\/blog\?pagina=3" rel="prev"/);
  assert.match(out, /href="\/blog\?pagina=5" rel="next"/);
  assert.match(out, /href="\/blog\?pagina=1" aria-label="Página 1"/);
  assert.match(out, /href="\/blog\?pagina=12" aria-label="Página 12"/);
  assert.match(out, /…/);
});

test('Pagination: en los extremos anterior o siguiente quedan deshabilitados sin enlace', () => {
  const first = html(<Pagination current={1} total={5} hrefTemplate="/p/{page}" />);
  assert.match(first, /<span [^>]*aria-disabled="true">Anterior<\/span>/);
  assert.doesNotMatch(first, /rel="prev"/);
  const last = html(<Pagination current={5} total={5} hrefTemplate="/p/{page}" />);
  assert.match(last, /<span [^>]*aria-disabled="true">Siguiente<\/span>/);
});

test('Pagination: con pocas páginas no pone puntos suspensivos', () => {
  assert.doesNotMatch(html(<Pagination current={2} total={4} hrefTemplate="/p/{page}" />), /…/);
});

test('LevelsTable: tabla real con caption, columnas y filas con encabezados', () => {
  const out = html(
    <LevelsTable caption="Qué incluye" levels={[{ name: 'Nivel 1', href: '/n1' }, { name: 'Nivel 2' }]} rows={[{ label: 'Diagnóstico', values: [true, false] }, { label: 'Soporte', values: ['Mensual', 'Semanal'] }]} />,
  );
  assert.match(out, /<caption /);
  assert.match(out, /<th scope="col" class="pese-levels-table__feature-head">Qué incluye<\/th>/);
  assert.match(out, /<th scope="row" class="pese-levels-table__feature">Diagnóstico<\/th>/);
  assert.match(out, /<a href="\/n1">Nivel 1<\/a>/);
  assert.match(out, /Mensual/);
});

test('LevelsTable: incluido y no incluido se dicen con palabras y la región se puede recorrer con teclado', () => {
  const out = html(<LevelsTable caption="C" levels={[{ name: 'A' }, { name: 'B' }]} rows={[{ label: 'X', values: [true, false] }]} />);
  assert.match(out, /Incluido/);
  assert.match(out, /No incluido/);
  assert.match(out, /role="region"/);
  assert.match(out, /tabindex="0"/i);
});
