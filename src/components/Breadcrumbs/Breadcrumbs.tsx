import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type BreadcrumbItem = {
  /** Texto de la miga. */
  label: string;
  /** Destino. La última miga (la página actual) no lleva enlace. */
  href?: string;
};

export type BreadcrumbsProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Recorrido desde la portada hasta la página actual, en ese orden. */
  items: BreadcrumbItem[];
  /** Nombre de la navegación para lectores de pantalla. Por defecto «Migas de pan». */
  label?: string;
};

/**
 * Migas de pan: muestran dónde está la persona y cómo volver (Inicio / Servicios / Diagnóstico).
 *
 * La última miga es la página actual: se marca con `aria-current="page"` y no es un enlace. Para
 * que Google las muestre en los resultados, agrega también `breadcrumbListJsonLd` (ver `JsonLd`).
 *
 * **Cuándo usarlas:** en páginas de segundo nivel o más profundas. En la portada no hacen falta.
 *
 * @example
 * ```tsx
 * <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Servicios', href: '/servicios' }, { label: 'Diagnóstico' }]} />
 * ```
 */
export function Breadcrumbs({ items, label = 'Migas de pan', className, ...rest }: BreadcrumbsProps) {
  return (
    <nav {...rest} aria-label={label} className={cx('pese-crumbs', className)}>
      <ol className="pese-crumbs__list">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="pese-crumbs__item">
              {last || !item.href ? (
                <span className="pese-crumbs__current" aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <a className="pese-crumbs__link" href={item.href}>
                  {item.label}
                </a>
              )}
              {!last && (
                <span className="pese-crumbs__sep" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
