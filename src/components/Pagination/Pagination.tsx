import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type PaginationProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Página actual (desde 1). */
  current: number;
  /** Cantidad total de páginas. Con 1 o menos no se dibuja nada. */
  total: number;
  /** Dirección de cada página, con `{page}` donde va el número. Por ejemplo `/blog?pagina={page}`. */
  hrefTemplate: string;
  /** Nombre de la navegación para lectores de pantalla. Por defecto «Paginación». */
  label?: string;
  /** Texto del enlace a la página anterior. */
  prevLabel?: string;
  /** Texto del enlace a la página siguiente. */
  nextLabel?: string;
};

type Slot = number | `gap-${number}`;

function slots(current: number, total: number): Slot[] {
  const keep = new Set([1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total));
  const pages = [...keep].sort((a, b) => a - b);
  const out: Slot[] = [];
  pages.forEach((p, i) => {
    const prev = pages[i - 1];
    if (prev !== undefined && p - prev > 1) out.push(p - prev === 2 ? prev + 1 : (`gap-${p}` as const));
    out.push(p);
  });
  return out;
}

/**
 * Paginación de un listado: anterior, números de página y siguiente.
 *
 * Son enlaces normales (funciona sin JavaScript y los buscadores siguen cada página). La página actual
 * se marca con `aria-current="page"` y con un recuadro, no solo con color.
 *
 * **Cuándo usarla:** en el listado del blog cuando hay más de una página.
 *
 * @example
 * ```tsx
 * <Pagination current={2} total={8} hrefTemplate="/blog?pagina={page}" />
 * ```
 */
export function Pagination({
  current,
  total,
  hrefTemplate,
  label = 'Paginación',
  prevLabel = 'Anterior',
  nextLabel = 'Siguiente',
  className,
  ...rest
}: PaginationProps) {
  if (total <= 1) return null;
  const href = (p: number) => hrefTemplate.replace('{page}', String(p));
  return (
    <nav {...rest} aria-label={label} className={cx('pese-pagination', className)}>
      <ul className="pese-pagination__list">
        <li>
          {current > 1 ? (
            <a className="pese-pagination__item pese-pagination__item--edge" href={href(current - 1)} rel="prev">
              {prevLabel}
            </a>
          ) : (
            <span className="pese-pagination__item pese-pagination__item--edge pese-pagination__item--off" aria-disabled="true">
              {prevLabel}
            </span>
          )}
        </li>
        {slots(current, total).map((s) =>
          typeof s === 'number' ? (
            <li key={s}>
              {s === current ? (
                <span className="pese-pagination__item pese-pagination__item--current" aria-current="page" aria-label={`Página ${s}, actual`}>
                  {s}
                </span>
              ) : (
                <a className="pese-pagination__item" href={href(s)} aria-label={`Página ${s}`}>
                  {s}
                </a>
              )}
            </li>
          ) : (
            <li key={s} aria-hidden="true">
              <span className="pese-pagination__gap">…</span>
            </li>
          ),
        )}
        <li>
          {current < total ? (
            <a className="pese-pagination__item pese-pagination__item--edge" href={href(current + 1)} rel="next">
              {nextLabel}
            </a>
          ) : (
            <span className="pese-pagination__item pese-pagination__item--edge pese-pagination__item--off" aria-disabled="true">
              {nextLabel}
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
