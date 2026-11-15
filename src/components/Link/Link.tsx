import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type LinkTone = 'brand' | 'inherit';

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> & {
  /** Destino del enlace. */
  href: string;
  /** brand: cobalto de la marca; inherit: toma el color del texto que lo rodea (úsalo sobre azul noche). */
  tone?: LinkTone;
  /** Si abre en una pestaña nueva. Agrega `rel` seguro y avisa con texto a quien usa lector de pantalla. */
  external?: boolean;
  /** Texto del enlace. Debe tener sentido solo: nada de «haz clic aquí». */
  children: ReactNode;
};

/**
 * Enlace de texto subrayado, con el foco de la marca.
 *
 * **Cuándo usarlo:** para llevar a otra página dentro de un párrafo o de una lista. Para una acción
 * destacada («Pedir diagnóstico») usa `Button`. El subrayado no se quita: es lo que lo distingue del
 * texto sin depender del color.
 *
 * @example
 * ```tsx
 * <p>Lee cómo trabajamos en <Link href="/metodo">nuestro método</Link>.</p>
 * <Link href="https://www.sii.cl" external>Sitio del SII</Link>
 * ```
 */
export function Link({ tone = 'brand', external, className, children, ...rest }: LinkProps) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a {...ext} {...rest} className={cx('pese-link', `pese-link--${tone}`, className)}>
      {children}
      {external && <span className="pese-link__ext"> (abre en una pestaña nueva)</span>}
    </a>
  );
}
