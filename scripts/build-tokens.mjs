// Genera los archivos de estilo y de JS a partir de tokens/tokens.json.
// Uso: npm run tokens   (no necesita dependencias)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const t = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const out = (file, text) => writeFileSync(join(root, file), text);
const HEADER = 'GENERADO por scripts/build-tokens.mjs a partir de tokens/tokens.json. No editar a mano.';

const colors = t.color.tokens;
const px = (list) => list.map((x) => [x.name, x.value]);
const vars = (mode) => colors.map((c) => `  --pese-${c.name}: ${c.value[mode]};`).join('\n');

// ---------- _tokens.scss (variables CSS con tema claro y oscuro) ----------
const fam = t.type.families;
const staticVars = [
  ...Object.entries(fam).map(([k, v]) => `  --pese-font-${k}: ${v};`),
  ...px(t.spacing.tokens).map(([n, v]) => `  --pese-${n}: ${v};`),
  ...px(t.radius.tokens).map(([n, v]) => `  --pese-${n}: ${v};`),
  ...px(t.shadow.tokens).map(([n, v]) => `  --pese-${n}: ${v};`),
].join('\n');

out(
  'src/styles/_tokens.scss',
  `// ${HEADER}
// Tema claro por defecto; oscuro con prefers-color-scheme o con data-theme="dark".
// data-theme="light" fuerza el claro aunque el sistema esté en oscuro.
:root,
[data-theme='light'] {
  color-scheme: light;
${vars('light')}
${staticVars}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    color-scheme: dark;
${vars('dark').replace(/^ {2}/gm, '    ')}
  }
}

[data-theme='dark'] {
  color-scheme: dark;
${vars('dark')}
}
`,
);

// ---------- tailwind.css (Tailwind v4, @theme apuntando a las variables) ----------
const tw = [
  ...colors.map((c) => `  --color-${c.name}: var(--pese-${c.name});`),
  ...Object.keys(fam).map((k) => `  --font-${k}: var(--pese-font-${k});`),
  ...t.radius.tokens.map((r) => `  --${r.name}: var(--pese-${r.name});`),
  ...t.shadow.tokens.map((s) => `  --${s.name}: var(--pese-${s.name});`),
].join('\n');
out(
  'src/styles/tailwind.css',
  `/* ${HEADER}
   Uso (Tailwind v4):  @import "tailwindcss";  @import "pese-ui/styles.css";  @import "pese-ui/tailwind.css";
   Después puedes escribir bg-surface-100, text-ink, bg-brand, rounded-xl, font-display, etc. */
@theme inline {
${tw}
}
`,
);

// ---------- daisyui.css (tema opcional para daisyUI v5) ----------
const hex = (mode, name) => colors.find((c) => c.name === name).value[mode];
const daisy = (mode) => {
  const h = (n) => hex(mode, n);
  return `  --color-base-100: ${h('surface-200')};
  --color-base-200: ${h('surface-100')};
  --color-base-300: ${h('surface-300')};
  --color-base-content: ${h('ink')};
  --color-primary: ${h('brand')};
  --color-primary-content: ${h('on-brand')};
  --color-secondary: ${h('deep')};
  --color-secondary-content: ${h('on-deep')};
  --color-accent: ${h('acento')};
  --color-accent-content: ${h('on-acento')};
  --color-neutral: ${h('deep')};
  --color-neutral-content: ${h('on-deep')};
  --color-info: ${h('brand')};
  --color-info-content: ${h('on-brand')};
  --color-success: ${h('ok')};
  --color-success-content: ${h('ok-bg')};
  --color-warning: ${h('warn')};
  --color-warning-content: ${h('warn-bg')};
  --color-error: ${h('danger')};
  --color-error-content: ${h('danger-bg')};
  --radius-selector: 999px;
  --radius-field: 8px;
  --radius-box: 12px;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 2px;
  --depth: 0;
  --noise: 0;`;
};
out(
  'src/styles/daisyui.css',
  `/* ${HEADER}
   Tema opcional para daisyUI v5. Uso:
     @import "tailwindcss";
     @plugin "daisyui" { themes: false; }
     @import "pese-ui/daisyui.css";
   Luego usa data-theme="pese" o "pese-dark". */
@plugin "daisyui/theme" {
  name: "pese";
  default: true;
  color-scheme: light;
${daisy('light')}
}

@plugin "daisyui/theme" {
  name: "pese-dark";
  prefersdark: true;
  color-scheme: dark;
${daisy('dark')}
}
`,
);

// ---------- tokens.ts (para usar los valores desde JS) ----------
const obj = (list) => Object.fromEntries(px(list));
out(
  'src/tokens.ts',
  `// ${HEADER}
export const colors = ${JSON.stringify(Object.fromEntries(colors.map((c) => [c.name, c.value])), null, 2)} as const;

export const spacing = ${JSON.stringify(obj(t.spacing.tokens), null, 2)} as const;

export const radius = ${JSON.stringify(obj(t.radius.tokens), null, 2)} as const;

export const fonts = ${JSON.stringify(fam, null, 2)} as const;

export type ColorToken = keyof typeof colors;
export type Theme = 'light' | 'dark';
`,
);

console.log('Tokens generados:', colors.length, 'colores');
