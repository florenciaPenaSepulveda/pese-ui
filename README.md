# @pese-cl/ui

[![npm](https://img.shields.io/npm/v/@pese-cl/ui)](https://www.npmjs.com/package/@pese-cl/ui)
[![CI](https://github.com/florenciaPenaSepulveda/pese-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/florenciaPenaSepulveda/pese-ui/actions/workflows/ci.yml)
[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-blue.svg)](LICENSE)

Librería de componentes de **PESE** (Peña y Sepúlveda): software que encaja con tu negocio.

- **React sin estado y listo para SSR:** los componentes son funciones puras. No usan `useState`, `useEffect` ni APIs del navegador, y no necesitan `'use client'`. Un test lo comprueba.
- **SCSS** para los estilos y **variables CSS** (`--pese-*`) para el tema, con modo claro y oscuro.
- **Tailwind v4** opcional: los tokens se publican como `@theme`.
- **daisyUI v5** opcional: tema `pese` y `pese-dark`, más los nombres de variantes que me parecieron útiles (`primary`, `secondary`, `accent`, `ghost`, `lg`, `featured`).
- **Accesibilidad AAA:** texto 7:1, gráficos y bordes 3:1, objetivos táctiles de 44 px y foco visible. Un test calcula los contrastes de todos los pares de colores, en claro y en oscuro.
- **Documentada:** cada componente explica para qué sirve y trae ejemplos de uso en Storybook («Show code»).

**Storybook:** https://pese-ui.onrender.com/

## Instalación

```bash
npm install @pese-cl/ui
```

Requiere `react` 18 o superior como dependencia del proyecto.

## Uso

```tsx
import { Button, LevelCard } from '@pese-cl/ui';
import '@pese-cl/ui/styles.css';

export default function Page() {
  return (
    <div className="pese-root">
      <LevelCard level={1} title="Primer flujo" description="Un proceso conectado." featured />
      <Button href="/diagnostico-gratuito">Pedir diagnóstico</Button>
    </div>
  );
}
```

Sirve igual en **Astro**, **Next.js** (componentes de servidor), Remix o `renderToString`. Importa `@pese-cl/ui/styles.css` una sola vez, en el layout.

> **Envuelve tu app (o tus secciones) en un contenedor con la clase `pese-root`.** Le da el fondo, la tipografía y el color de texto del tema, y activa el foco de 3px de la marca en los enlaces sueltos (`a`). Sin ella, los componentes se ven bien, pero los enlaces que escribas tú conservan el foco del navegador.

### En Astro

```astro
---
import { Button } from '@pese-cl/ui';
import '@pese-cl/ui/styles.css';
---
<main class="pese-root">
  <Button href="/diagnostico-gratuito" size="lg">Pedir diagnóstico</Button>
</main>
```

Como los componentes no tienen estado, Astro los renderiza a HTML en el servidor y no envía JavaScript al navegador.

### Tema claro y oscuro

Por defecto sigue al sistema. Para forzarlo, pon `data-theme="light"` o `data-theme="dark"` en `<html>` (o en cualquier contenedor).

### Tailwind v4

```css
@import 'tailwindcss';
@import '@pese-cl/ui/styles.css';
@import '@pese-cl/ui/tailwind.css';
```

Ahora existen `bg-surface-100`, `text-ink`, `bg-brand`, `rounded-xl`, `font-display`, etc., y cambian solos con el tema.

> **Ojo:** `rounded-xl` pasa a valer el radio de la marca (28 px, la esquina grande), no el de Tailwind por defecto.

### daisyUI v5 (opcional)

```css
@import 'tailwindcss';
@plugin 'daisyui' { themes: false; }
@import '@pese-cl/ui/daisyui.css';
```

Usa `data-theme="pese"` o `"pese-dark"`. Está generado desde los mismos tokens, pero no se ha probado contra todas las versiones de daisyUI.

## Componentes

| Componente | Para qué sirve |
| --- | --- |
| `Button` | Acciones: primario, secundario, acento y texto; se pinta como `<a>` si recibe `href`. |
| `Badge`, `Status` | Etiqueta corta, y estado con icono y palabra. |
| `Card` | Contenedor con la esquina grande de la marca. |
| `LevelCard` | Tarjeta de nivel de servicio con hueco para la insignia amarilla. |
| `LevelIndicator` | Barra de tres tramos para el nivel del cliente. |
| `Steps` | Pasos con estado: hecho, en curso, pendiente. |
| `Logo`, `Icon` | Logo y cinco iconos en SVG, con los colores del tema. |
| `Layout` | Estructura de página: cabecera, un solo `<main>` con `id` (destino del enlace «Saltar al contenido») y pie siempre abajo. Ya incluye `pese-root`. |
| `Container` | Centra el contenido y limita su ancho (`narrow` 720 px, `default` 1120 px, `wide` 1280 px). |
| `Header`, `Footer` | Cabecera con menú sin JavaScript y pie con columnas de enlaces, contacto y franja legal. |

El detalle de cada propiedad, con ejemplos y su código, está en [Storybook](https://pese-ui.onrender.com/).

## Fuentes

La marca usa Space Grotesk (titulares), Instrument Sans (texto) y JetBrains Mono (datos). El paquete las trae **autoalojadas**, para no depender de Google Fonts: ahorra una conexión externa, respeta la privacidad de quien visita y evita saltos de diseño. Importa la hoja una sola vez, junto a los estilos:

```css
@import '@pese-cl/ui/fonts.css';
@import '@pese-cl/ui/styles.css';
```

En Astro, Next.js o Vite sirve igual con `import '@pese-cl/ui/fonts.css';`: el empaquetador copia los `.woff2` y reescribe las rutas. Son fuentes variables, con el subconjunto latino (cubre la ñ, las tildes, ¿ y ¡) y `font-display: swap`. Licencia SIL Open Font License 1.1, incluida junto a los archivos.

Para que no haya parpadeo en la primera carga, puedes precargar la fuente de los titulares con un `<link rel="preload" as="font" type="font/woff2" crossorigin>` que apunte al archivo `space-grotesk-latin-wght-normal.woff2`.

## Tokens

`tokens/tokens.json` es la fuente de color, tipografía, radios y espacios. También se puede importar desde `@pese-cl/ui/tokens.json`. `npm run tokens` genera `src/styles/_tokens.scss`, `tailwind.css`, `daisyui.css` y `src/tokens.ts`. Esos archivos se versionan, y la CI falla si no coinciden con el JSON.

## Versiones

El paquete sigue [versionado semántico](https://semver.org/lang/es/): los cambios que rompen compatibilidad suben la versión mayor, los componentes nuevos la menor y las correcciones el parche. Las versiones se generan solas a partir de los mensajes de commit; el historial está en [CHANGELOG.md](CHANGELOG.md) y en las [versiones de GitHub](https://github.com/florenciaPenaSepulveda/pese-ui/releases).

## Desarrollo

```bash
git clone https://github.com/florenciaPenaSepulveda/pese-ui.git
cd pese-ui
npm install
npm test            # tokens, SSR y accesibilidad
npm run build       # genera dist/ (JS + CSS)
npm run storybook   # http://localhost:6006
```

```
src/components/<Nombre>/   componente (.tsx), estilos (.scss) e historias (.stories.tsx)
src/styles/                tokens, base e índice de estilos
scripts/                   generación de tokens
tests/                     node:test + react-dom/server
.storybook/                configuración de Storybook
```

Las ramas, las convenciones de commits y el flujo de publicación están en [CONTRIBUTING.md](CONTRIBUTING.md).

## Licencia

[MIT](LICENSE) © Florencia Peña Sepúlveda
