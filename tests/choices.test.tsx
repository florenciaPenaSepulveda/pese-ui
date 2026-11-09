import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Checkbox, RadioGroup, Select, Textarea } from '../src';
import { html } from './helpers';

test('Textarea: etiqueta y campo comparten id, con 5 filas por defecto', () => {
  const out = html(<Textarea id="mensaje" label="Mensaje" />);
  assert.match(out, /<label [^>]*for="mensaje"/);
  assert.match(out, /<textarea [^>]*id="mensaje"/);
  assert.match(out, /rows="5"/);
});

test('Textarea: ayuda y error se conectan y marcan aria-invalid', () => {
  const out = html(<Textarea id="m" label="M" hint="Ayuda" error="Falta" required />);
  assert.match(out, /aria-describedby="m-hint m-error"/);
  assert.match(out, /aria-invalid="true"/);
  assert.match(out, /<span class="pese-field__error-label">Error: <\/span>Falta/);
  assert.match(out, /\(obligatorio\)/);
});

test('Select: opciones en orden, con opción vacía solo si hay placeholder', () => {
  const options = [{ value: 'a', label: 'Uno' }, { value: 'b', label: 'Dos', disabled: true }];
  const con = html(<Select id="s" label="S" options={options} placeholder="Elige" />);
  assert.match(con, /<option value="">Elige<\/option><option value="a">Uno<\/option><option value="b" disabled="">Dos<\/option>/);
  const sin = html(<Select id="s" label="S" options={options} />);
  assert.doesNotMatch(sin, /value=""/);
});

test('Select: etiqueta, error y valor inicial', () => {
  const out = html(
    <Select id="s" label="S" options={[{ value: 'a', label: 'Uno' }, { value: 'b', label: 'Dos' }]} defaultValue="b" error="Elige" />,
  );
  assert.match(out, /<label [^>]*for="s"/);
  assert.match(out, /<select [^>]*id="s"/);
  assert.match(out, /aria-invalid="true"/);
  assert.match(out, /<option value="b" selected="">Dos<\/option>/);
});

test('Checkbox: casilla nativa unida a su texto por id', () => {
  const out = html(<Checkbox id="acepto" name="acepto" label="Acepto" />);
  assert.match(out, /<input [^>]*id="acepto"/);
  assert.match(out, /type="checkbox"/);
  assert.match(out, /<label for="acepto" class="pese-choice__label">Acepto<\/label>/);
});

test('Checkbox: el texto puede llevar un enlace; error y ayuda se conectan', () => {
  const out = html(
    <Checkbox id="a" label={<a href="/privacidad">política</a>} hint="Ayuda" error="Marca la casilla" />,
  );
  assert.match(out, /<a href="\/privacidad">política<\/a>/);
  assert.match(out, /aria-describedby="a-hint a-error"/);
  assert.match(out, /aria-invalid="true"/);
  assert.match(out, /pese-choice--error/);
});

test('RadioGroup: fieldset con legend y una opción por radio con el mismo name', () => {
  const out = html(
    <RadioGroup id="canal" name="canal" legend="¿Cómo?" options={[{ value: 'c', label: 'Correo' }, { value: 't', label: 'Teléfono' }]} />,
  );
  assert.match(out, /^<fieldset /);
  assert.match(out, /<legend [^>]*>¿Cómo\?<\/legend>/);
  assert.equal((out.match(/type="radio"/g) ?? []).length, 2);
  assert.equal((out.match(/name="canal"/g) ?? []).length, 2);
  assert.match(out, /<label for="canal-1" class="pese-choice__label">Correo<\/label>/);
  assert.match(out, /<label for="canal-2" class="pese-choice__label">Teléfono<\/label>/);
});

test('RadioGroup: valor inicial, obligatorio y opción deshabilitada', () => {
  const out = html(
    <RadioGroup id="g" name="g" legend="L" required defaultValue="t" options={[{ value: 'c', label: 'C' }, { value: 't', label: 'T', disabled: true }]} />,
  );
  assert.match(out, /\(obligatorio\)/);
  assert.match(out, /<input id="g-2"[^>]*checked=""/);
  assert.match(out, /<input id="g-2"[^>]*disabled=""/);
  assert.doesNotMatch(out, /<input id="g-1"[^>]*(checked|disabled)=""/);
});

test('RadioGroup: ayuda por opción y error del grupo quedan conectados', () => {
  const out = html(
    <RadioGroup id="g" name="g" legend="L" hint="Ayuda" error="Elige una" options={[{ value: 'c', label: 'C', hint: 'Explicación' }]} />,
  );
  assert.match(out, /<fieldset [^>]*aria-describedby="g-hint g-error"/);
  assert.match(out, /<p id="g-1-hint" class="pese-field__hint pese-choice__hint">Explicación<\/p>/);
  assert.match(out, /aria-describedby="g-1-hint"/);
  assert.match(out, /<span class="pese-field__error-label">Error: <\/span>Elige una/);
});
