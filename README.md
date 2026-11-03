# pese-ui

Librería de componentes de **PESE** (Peña y Sepúlveda): software que encaja con tu negocio.

- **React sin estado y listo para SSR:** los componentes son funciones puras. No usan `useState`, `useEffect` ni APIs del navegador, y no necesitan `'use client'`. Un test lo comprueba.
- **SCSS** para los estilos y **variables CSS** (`--pese-*`) para el tema, con modo claro y oscuro.
- **Tailwind v4** opcional: los tokens se publican como `@theme`.
- **daisyUI v5** opcional: tema `pese` y `pese-dark`, más los nombres de variantes que me parecieron útiles (`primary`, `secondary`, `accent`, `ghost`, `lg`, `featured`).
- **Accesibilidad AAA:** texto 7:1, gráficos y bordes 3:1, objetivos táctiles de 44 px y foco visible. Un test calcula los contrastes de todos los pares de colores, en claro y en oscuro.
- **Storybook** con interruptor de tema y revisión de accesibilidad (axe).

El diseño completo (logo, color, tipografía, formas) vive en el sistema de diseño de PESE; `tokens/tokens.json` es la copia que alimenta esta librería.

## Inicio rápido

```bash
npm install
npm test            # tokens, SSR y accesibilidad
npm run build       # genera dist/ (JS + CSS)
npm run storybook   # http://localhost:6006
```

## Uso

```tsx
import { Button, LevelCard } from 'pese-ui';
import 'pese-ui/styles.css';

export default function Page() {
  return (
    <>
      <LevelCard level={1} title="Primer flujo" description="Un proceso conectado." featured />
      <Button href="/diagnostico">Pedir diagnóstico</Button>
    </>
  );
}
```

Sirve igual en Next.js (componentes de servidor), Astro, Remix o `renderToString`. Importa `pese-ui/styles.css` una vez, en el layout.

### Tema claro y oscuro

Por defecto sigue al sistema. Para forzarlo, pon `data-theme="light"` o `data-theme="dark"` en `<html>` (o en cualquier contenedor).

### Tailwind v4

```css
@import 'tailwindcss';
@import 'pese-ui/styles.css';
@import 'pese-ui/tailwind.css';
```

Ahora existen `bg-surface-100`, `text-ink`, `bg-brand`, `rounded-xl`, `font-display`, etc., y cambian solos con el tema.

### daisyUI v5 (opcional)

```css
@import 'tailwindcss';
@plugin 'daisyui' { themes: false; }
@import 'pese-ui/daisyui.css';
```

Usa `data-theme="pese"` o `"pese-dark"`. Está generado desde los mismos tokens, pero no se ha probado contra todas las versiones de daisyUI.

## Componentes

| Componente | Para qué sirve |
| --- | --- |
| `Button` | Primario, secundario, acento y texto; se pinta como `<a>` si recibe `href`. |
| `Badge`, `Status` | Etiqueta corta y estado con icono y palabra. |
| `Card` | Contenedor con la esquina grande de la marca. |
| `LevelCard` | Tarjeta de nivel con hueco para la insignia amarilla. |
| `LevelIndicator` | Barra de tres tramos para el nivel del cliente. |
| `Steps` | Pasos con estado: hecho, en curso, pendiente. |
| `Logo`, `Icon` | Logo y cinco iconos en SVG, con los colores del tema. |

## Tokens

`tokens/tokens.json` es la fuente. `npm run tokens` genera `src/styles/_tokens.scss`, `tailwind.css`, `daisyui.css` y `src/tokens.ts`. Esos archivos se versionan, y la CI falla si no coinciden con el JSON.

## Estructura

```
src/components/<Nombre>/   componente (.tsx), estilos (.scss) e historias (.stories.tsx)
src/styles/                tokens, base e índice de estilos
scripts/                   generación de tokens
tests/                     node:test + react-dom/server
.storybook/                configuración de Storybook
```

## Convenciones

- Sin estado: si un componente necesita interactividad, se resuelve con HTML nativo (`<details>`, `<a>`) o lo controla quien lo usa.
- Clases `pese-bloque__elemento--modificador`.
- Español de Chile en textos y documentación; commits en formato `tipo: mensaje`.

## Licencia

MIT
