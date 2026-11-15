import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Input, Label, Link } from '../src';
import { html } from './helpers';

test('Link: es un enlace subrayado de la marca', () => {
  const out = html(<Link href="/metodo">nuestro método</Link>);
  assert.match(out, /^<a /);
  assert.match(out, /href="\/metodo"/);
  assert.match(out, /pese-link pese-link--brand/);
  assert.doesNotMatch(out, /target=|rel=/);
});

test('Link: external abre en pestaña nueva con rel seguro y aviso en texto', () => {
  const out = html(<Link href="https://www.sii.cl" external>SII</Link>);
  assert.match(out, /target="_blank"/);
  assert.match(out, /rel="noopener noreferrer"/);
  assert.match(out, /abre en una pestaña nueva/);
});

test('Link: tone="inherit" toma el color del texto', () => {
  assert.match(html(<Link href="/x" tone="inherit">x</Link>), /pese-link--inherit/);
});

test('Label: queda asociada al campo con for', () => {
  assert.match(html(<Label htmlFor="correo">Correo</Label>), /<label [^>]*for="correo"/);
});

test('Label: obligatorio y opcional se dicen con palabras', () => {
  assert.match(html(<Label htmlFor="a" required>A</Label>), /\(obligatorio\)/);
  assert.match(html(<Label htmlFor="a" optional>A</Label>), /\(opcional\)/);
  assert.doesNotMatch(html(<Label htmlFor="a">A</Label>), /obligatorio|opcional/);
  assert.doesNotMatch(html(<Label htmlFor="a" required optional>A</Label>), /opcional/);
});

test('Input: la etiqueta y el campo comparten id', () => {
  const out = html(<Input id="nombre" label="Nombre" />);
  assert.match(out, /<label [^>]*for="nombre"/);
  assert.match(out, /<input [^>]*id="nombre"/);
  assert.match(out, /type="text"/);
});

test('Input: sin ayuda ni error no declara aria-describedby ni aria-invalid', () => {
  const out = html(<Input id="nombre" label="Nombre" />);
  assert.doesNotMatch(out, /aria-describedby|aria-invalid/);
});

test('Input: la ayuda queda conectada con aria-describedby', () => {
  const out = html(<Input id="tel" label="Teléfono" hint="Con código de área" />);
  assert.match(out, /<p id="tel-hint" class="pese-field__hint">Con código de área<\/p>/);
  assert.match(out, /aria-describedby="tel-hint"/);
});

test('Input: el error marca aria-invalid, se conecta y empieza con la palabra «Error»', () => {
  const out = html(<Input id="correo" label="Correo" hint="Ayuda" error="Falta la @" />);
  assert.match(out, /aria-invalid="true"/);
  assert.match(out, /aria-describedby="correo-hint correo-error"/);
  assert.match(out, /<p id="correo-error" class="pese-field__error"><span class="pese-field__error-label">Error: <\/span>Falta la @<\/p>/);
  assert.match(out, /pese-field--error/);
});

test('Input: required e optional se reflejan en la etiqueta y el campo', () => {
  const req = html(<Input id="a" label="A" required />);
  assert.match(req, /\(obligatorio\)/);
  assert.match(req, /<input [^>]*required=""/);
  assert.match(html(<Input id="a" label="A" optional />), /\(opcional\)/);
});

test('Input: respeta el type y deja pasar atributos del campo', () => {
  const out = html(<Input id="c" label="C" type="email" name="correo" autoComplete="email" placeholder="a@b.cl" />);
  assert.match(out, /type="email"/);
  assert.match(out, /name="correo"/);
  assert.match(out, /autoComplete="email"|autocomplete="email"/);
});

test('Input: conserva un aria-describedby propio junto a los suyos', () => {
  const out = html(<Input id="a" label="A" hint="h" aria-describedby="otro" />);
  assert.match(out, /aria-describedby="a-hint otro"/);
});
