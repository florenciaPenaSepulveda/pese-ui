import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Eyebrow, FieldError, FieldHint } from '../src';
import { joinIds } from '../src/utils/aria';
import { html } from './helpers';

test('Eyebrow: párrafo corto con la tipografía de datos, no un encabezado', () => {
  const out = html(<Eyebrow>Para negocios de La Serena</Eyebrow>);
  assert.equal(out, '<p class="pese-eyebrow">Para negocios de La Serena</p>');
});

test('FieldHint: párrafo de apoyo con su id', () => {
  assert.equal(html(<FieldHint id="a-hint">Ayuda</FieldHint>), '<p id="a-hint" class="pese-field__hint">Ayuda</p>');
});

test('FieldError: abre con la palabra «Error» y el prefijo se puede cambiar', () => {
  assert.equal(
    html(<FieldError id="a-error">Falta</FieldError>),
    '<p id="a-error" class="pese-field__error"><span class="pese-field__error-label">Error: </span>Falta</p>',
  );
  assert.match(html(<FieldError prefix="Atención: ">Falta</FieldError>), />Atención: <\/span>Falta/);
});

test('joinIds: une ids, salta vacíos y devuelve undefined si no queda ninguno', () => {
  assert.equal(joinIds('a', undefined, 'b', false, null, ''), 'a b');
  assert.equal(joinIds(undefined, false), undefined);
  assert.equal(joinIds(), undefined);
});
