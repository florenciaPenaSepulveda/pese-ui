// Copia los CSS ya generados (Tailwind y daisyUI) a dist/. Funciona igual en Windows, macOS y Linux.
import { copyFileSync, mkdirSync } from 'node:fs';
mkdirSync('dist', { recursive: true });
copyFileSync('src/styles/tailwind.css', 'dist/tailwind.css');
copyFileSync('src/styles/daisyui.css', 'dist/daisyui.css');
console.log('CSS copiados a dist/');
