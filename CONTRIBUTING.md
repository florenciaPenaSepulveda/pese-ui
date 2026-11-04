# Cómo trabajar en @pese-cl/ui

Esta guía explica cómo se desarrolla, se prueba y se publica la librería.

## Ramas

| Rama | Para qué sirve |
| --- | --- |
| `development` | Aquí se trabaja día a día. Todo cambio nuevo entra por aquí. |
| `testing` | Se revisa lo que está por salir. Recibe cambios desde `development`. |
| `main` | Lo publicado. Cada llegada a `main` puede generar una versión nueva en npm. |

## Puesta en marcha

```bash
npm install
npm run storybook   # http://localhost:6006
npm test            # tokens, SSR y accesibilidad
npm run typecheck
npm run build       # genera dist/ (JS + CSS)
```

## Reglas de los componentes

1. **Sin estado y listos para SSR:** nada de `useState`, `useEffect`, `window`, `document` ni `'use client'`. Un test lo comprueba.
2. **Accesibilidad AAA:** texto 7:1, gráficos y bordes 3:1, objetivos táctiles de 44 px, foco visible. El color nunca es la única señal.
3. **Estilos con variables `--pese-*`** y nombres BEM (`pese-bloque__elemento--modificador`). Los colores salen de `tokens/tokens.json`, no se escriben a mano.
4. **Documentación en el código:** cada componente lleva un comentario JSDoc que explica para qué sirve y cuándo usarlo, con un `@example`; cada propiedad lleva su descripción.
5. **Una story por caso de uso** en `*.stories.tsx`, con su comentario explicativo. En las que usan `render`, añade `parameters.docs.source.code` para que «Show code» muestre el código real de uso.
6. Todo componente nuevo se exporta desde `src/index.ts` con sus tipos y trae pruebas en `tests/`.

## Mensajes de commit

Se usan [commits convencionales](https://www.conventionalcommits.org/es/): `tipo: descripción`. El tipo decide la versión que se publica.

| Tipo | Cuándo | Versión |
| --- | --- | --- |
| `fix:` | Corrige un error | parche (1.0.0 → 1.0.1) |
| `feat:` | Añade un componente o una propiedad | menor (1.0.0 → 1.1.0) |
| `feat!:` o `BREAKING CHANGE:` en el cuerpo | Cambia algo de forma que rompe a quien ya lo usa | mayor (1.0.0 → 2.0.0) |
| `docs:`, `chore:`, `test:`, `refactor:`, `style:`, `ci:` | Documentación, mantenimiento, pruebas, orden interno | no publica |

Ejemplos: `feat: añadir componente Hero`, `fix: corregir foco del botón sobre azul noche`, `docs: explicar el uso de Steps`.

## Cómo se publica

1. El trabajo avanza en `development` y se revisa en `testing`.
2. Al llegar los cambios a `main`, el flujo **Release** (`.github/workflows/release.yml`) corre las pruebas, decide la versión con los mensajes de commit, actualiza `CHANGELOG.md`, publica `@pese-cl/ui` en npm y crea la versión en GitHub.
3. No se edita a mano la versión de `package.json` ni el `CHANGELOG.md`: los genera el flujo.

Requisitos: en npmjs.com, la **publicación confiable** (Trusted Publisher) del paquete apuntando a este repositorio y al archivo `release.yml`, y en GitHub la variable del repositorio `RELEASE_ENABLED` con valor `true`. No se guarda ningún token de npm. La primera versión se publica a mano una vez, porque npm solo permite configurar la publicación confiable en un paquete que ya existe.
