// Autoaloja las tres fuentes de la marca: copia los .woff2 (variables, subconjunto latino) desde
// los paquetes @fontsource-variable a dist/fonts/ y genera dist/fonts.css con sus @font-face.
// Uso: npm run build:fonts   (se ejecuta también dentro de npm run build)
// El subconjunto latino cubre el español de Chile (ñ, tildes, ¿ y ¡) y el euro.
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Las tres familias de tokens/tokens.json (display, body y mono), con su rango de pesos. */
export const FONTS = [
  { family: 'Space Grotesk', pkg: 'space-grotesk', file: 'space-grotesk-latin-wght-normal.woff2', weight: '300 700' },
  { family: 'Instrument Sans', pkg: 'instrument-sans', file: 'instrument-sans-latin-wght-normal.woff2', weight: '400 700' },
  { family: 'JetBrains Mono', pkg: 'jetbrains-mono', file: 'jetbrains-mono-latin-wght-normal.woff2', weight: '100 800' },
];

// Rango de caracteres del subconjunto «latin» de Google Fonts.
const LATIN =
  'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, ' +
  'U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';

/** Devuelve el CSS con un @font-face por fuente. Las rutas son relativas a fonts.css. */
export function fontFaceCss(fonts = FONTS) {
  const faces = fonts.map(
    (f) => `@font-face {
  font-family: "${f.family}";
  font-style: normal;
  font-weight: ${f.weight};
  font-display: swap;
  src: url("./fonts/${f.file}") format("woff2");
  unicode-range: ${LATIN};
}`,
  );
  return `/* GENERADO por scripts/build-fonts.mjs. No editar a mano.
   Fuentes de la marca autoalojadas (licencia SIL OFL 1.1; ver fonts/LICENSE-*.txt). */
${faces.join('\n\n')}
`;
}

function build() {
  const outDir = join(root, 'dist', 'fonts');
  mkdirSync(outDir, { recursive: true });
  for (const f of FONTS) {
    const dir = join(root, 'node_modules', '@fontsource-variable', f.pkg);
    const from = join(dir, 'files', f.file);
    if (!existsSync(from)) {
      throw new Error(
        `No encuentro ${from}.\nInstala los paquetes de fuentes: npm install -D @fontsource-variable/${f.pkg}`,
      );
    }
    copyFileSync(from, join(outDir, f.file));
    const license = join(dir, 'LICENSE');
    if (existsSync(license)) copyFileSync(license, join(outDir, `LICENSE-${f.pkg}.txt`));
  }
  writeFileSync(join(root, 'dist', 'fonts.css'), fontFaceCss());
  console.log(`Fuentes autoalojadas en dist/fonts/ (${FONTS.length}) y dist/fonts.css`);
}

// Solo corre al ejecutarlo directamente (no al importarlo desde un test).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) build();
