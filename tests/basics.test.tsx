import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Divider, Heading, Image, Spinner, Text } from '../src';
import { html } from './helpers';

test('Divider: es un hr; strong lo marca', () => {
  assert.match(html(<Divider />), /^<hr class="pese-divider"\/>$/);
  assert.match(html(<Divider strong />), /pese-divider--strong/);
});

test('Spinner: anuncia su texto con role=status y el anillo es decorativo', () => {
  const out = html(<Spinner />);
  assert.match(out, /role="status"/);
  assert.match(out, /<span class="pese-spinner__ring" aria-hidden="true"><\/span>/);
  assert.match(out, /<span class="pese-spinner__label">Cargando<\/span>/);
  assert.doesNotMatch(out, /pese-spinner--labelled/);
});

test('Spinner: label, showLabel y tamaño', () => {
  const out = html(<Spinner size="sm" label="Enviando" showLabel />);
  assert.match(out, /pese-spinner--sm/);
  assert.match(out, /pese-spinner--labelled/);
  assert.match(out, />Enviando<\/span>/);
});

test('Image: alt obligatorio, tamaño declarado, carga diferida y decoding async', () => {
  const out = html(<Image src="/a.webp" alt="Equipo" width={1200} height={800} />);
  assert.match(out, /alt="Equipo"/);
  assert.match(out, /width="1200"/);
  assert.match(out, /height="800"/);
  assert.match(out, /loading="lazy"/);
  assert.match(out, /decoding="async"/);
  assert.doesNotMatch(out, /figure/);
});

test('Image: priority carga de inmediato y con prioridad alta', () => {
  const out = html(<Image src="/a.webp" alt="" width={10} height={10} priority />);
  assert.match(out, /loading="eager"/);
  assert.match(out, /fetchPriority="high"/i);
  assert.match(out, /alt=""/);
});

test('Image: ratio agrega su clase y caption envuelve en figure', () => {
  assert.match(html(<Image src="/a.webp" alt="x" width={10} height={10} ratio="16/9" />), /pese-image--r-16-9/);
  const out = html(<Image src="/a.webp" alt="x" width={10} height={10} caption="Pie" />);
  assert.match(out, /^<figure class="pese-figure"><img /);
  assert.match(out, /<figcaption class="pese-figure__caption">Pie<\/figcaption>/);
});

test('Heading: el nivel decide la etiqueta y el tamaño sale del nivel', () => {
  assert.match(html(<Heading level={1}>A</Heading>), /^<h1 class="pese-heading pese-heading--display">A<\/h1>$/);
  assert.match(html(<Heading level={2}>A</Heading>), /^<h2 class="pese-heading pese-heading--xl">/);
  assert.match(html(<Heading level={3}>A</Heading>), /^<h3 class="pese-heading pese-heading--lg">/);
  assert.match(html(<Heading level={6}>A</Heading>), /^<h6 class="pese-heading pese-heading--sm">/);
});

test('Heading: size cambia el aspecto sin cambiar el nivel', () => {
  assert.match(html(<Heading level={2} size="md">A</Heading>), /^<h2 class="pese-heading pese-heading--md">/);
});

test('Text: párrafo md por defecto; as, size, tone y measure', () => {
  assert.match(html(<Text>A</Text>), /^<p class="pese-text pese-text--md">A<\/p>$/);
  const out = html(<Text as="span" size="sm" tone="muted" measure>A</Text>);
  assert.match(out, /^<span /);
  assert.match(out, /pese-text--sm/);
  assert.match(out, /pese-text--muted/);
  assert.match(out, /pese-text--measure/);
});
