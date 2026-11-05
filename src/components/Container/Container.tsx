import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type ContainerSize = 'narrow' | 'default' | 'wide';

export type ContainerProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Elemento HTML a usar. Por defecto `div`; usa `section` si el bloque tiene un título propio. */
  as?: ElementType;
  /** narrow: 720 px, para leer texto largo; default: 1120 px; wide: 1280 px, para cuadrículas amplias. */
  size?: ContainerSize;
  children: ReactNode;
};

/**
 * Centra el contenido y limita su ancho, con márgenes laterales que crecen con la pantalla.
 *
 * **Cuándo usarlo:** dentro de cada sección de la página, para que el texto no se estire
 * de borde a borde. Usa `size="narrow"` en artículos y formularios (líneas de lectura cómodas)
 * y `size="wide"` solo cuando haya una cuadrícula que lo aproveche.
 *
 * @example
 * ```tsx
 * <section>
 *   <Container size="narrow">
 *     <h2>Cómo trabajamos</h2>
 *     <p>Primero conversamos y entendemos tu negocio.</p>
 *   </Container>
 * </section>
 * ```
 */
export function Container({ as, size = 'default', className, children, ...rest }: ContainerProps) {
  const Tag: ElementType = as ?? 'div';
  return (
    <Tag {...rest} className={cx('pese-container', `pese-container--${size}`, className)}>
      {children}
    </Tag>
  );
}
