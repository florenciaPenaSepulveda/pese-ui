import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactElement } from 'react';

/** Renderiza como en el servidor (SSR) y devuelve el HTML. */
export const html = (el: ReactElement): string => renderToStaticMarkup(el);
