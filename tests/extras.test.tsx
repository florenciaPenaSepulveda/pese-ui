import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ContactForm, Footer, Icon, Logo } from '../src';
import { html } from './helpers';

test('ContactForm: fields elige y ordena, con campos propios', () => {
  const out = html(
    <ContactForm
      action="/x"
      fields={['nombre', { name: 'negocio', label: 'Nombre de tu negocio', autoComplete: 'organization' }, 'mensaje']}
    />,
  );
  assert.ok(out.indexOf('name="nombre"') < out.indexOf('name="negocio"'));
  assert.ok(out.indexOf('name="negocio"') < out.indexOf('name="mensaje"'));
  assert.match(out, /Nombre de tu negocio/);
  assert.match(out, /\(opcional\)/);
  assert.doesNotMatch(out, /name="correo"|name="telefono"|name="consentimiento"/);
});

test('ContactForm: hiddenFields, etiquetas propias y consentimiento con otro valor', () => {
  const out = html(<ContactForm action="/x" privacyHref="/p" labels={{ nombre: 'Tu nombre' }} hiddenFields={{ origen: 'portada' }} consent={{ value: 'si' }} />);
  assert.match(out, /<input[^>]*type="hidden"[^>]*name="origen"[^>]*value="portada"|<input[^>]*name="origen"[^>]*type="hidden"/);
  assert.match(out, /Tu nombre/);
  assert.match(out, /name="consentimiento"[^>]*value="si"|value="si"[^>]*name="consentimiento"/);
  assert.match(html(<ContactForm action="/x" privacyHref="/p" values={{ consentimiento: 'si' }} consent={{ value: 'si' }} />), /checked/);
});

test('ContactForm: el error de un campo propio entra en el resumen con su enlace', () => {
  const out = html(
    <ContactForm action="/x" fields={[{ name: 'negocio', label: 'Negocio', required: true }]} errors={{ negocio: 'Escribe el nombre' }} />,
  );
  assert.match(out, /href="#contacto-negocio">Negocio: Escribe el nombre/);
});

test('ContactForm: sin enlace de privacidad el consentimiento no inventa uno', () => {
  assert.doesNotMatch(html(<ContactForm action="/x" fields={['consentimiento']} />), /<a /);
});

test('Icon: instagram y linkedin existen y se anuncian con label', () => {
  assert.match(html(<Icon name="instagram" />), /aria-hidden="true"/);
  assert.match(html(<Icon name="linkedin" label="LinkedIn" />), /aria-label="LinkedIn"/);
});

test('Footer: las redes son una navegación con un enlace con nombre por cada una', () => {
  const out = html(<Footer social={[{ label: 'Instagram de PESE', href: 'https://instagram.com/x', icon: 'instagram' }]} />);
  assert.match(out, /<nav aria-label="Redes sociales">/);
  assert.match(out, /aria-label="Instagram de PESE"/);
  assert.doesNotMatch(html(<Footer />), /Redes sociales/);
});

test('Logo: el subtítulo se anuncia junto al título y solo existe en la variante logo', () => {
  assert.match(html(<Logo subtitle="Software" />), /aria-label="PESE Software"/);
  assert.match(html(<Logo subtitle="Software" />), /pese-logo__subtitle/);
  assert.doesNotMatch(html(<Logo variant="mark" subtitle="Software" />), /subtitle/);
  assert.match(html(<Logo />), /viewBox="0 0 203 64"/);
  assert.doesNotMatch(html(<Logo />), /subtitle/);
});
