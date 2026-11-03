import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2020',
  external: ['react', 'react/jsx-runtime'],
  // Sin 'use client': los componentes son funciones puras y se pueden renderizar en el servidor.
});
