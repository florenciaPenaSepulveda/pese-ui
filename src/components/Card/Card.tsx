import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type CardTone = 'plain' | 'tint' | 'deep';

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Elemento HTML a usar. Por defecto `div`; usa `article` o `section` cuando tenga sentido. */
  as?: ElementType;
  /** plain: superficie con borde; tint: bloque suave; deep: azul noche con texto claro. */
  tone?: CardTone;
  /** Esquina superior izquierda grande (la forma de la marca). */
  bigCorner?: boolean;
  children: ReactNode;
};

/**
 * Contenedor base para agrupar contenido: un servicio, un caso, un bloque destacado.
 *
 * **Cuándo usarla:** cuando varias cosas deben leerse juntas. Usa `tone="deep"` para un
 * bloque que debe resaltar (texto claro sobre azul noche) y `as="article"` o `as="section"`
 * cuando el contenido tenga sentido por sí solo.
 *
 * @example
 * ```tsx
 * <Card as="article" tone="tint">
 *   <h3>Automatiza tu inventario</h3>
 *   <p>Conectamos ventas y bodega.</p>
 * </Card>
 * ```
 */
export function Card({ as, tone = 'plain', bigCorner = true, className, children, ...rest }: CardProps) {
  const Tag: ElementType = as ?? 'div';
  return (
    <Tag {...rest} className={cx('pese-card', `pese-card--${tone}`, bigCorner && 'pese-card--corner', className)}>
      {children}
    </Tag>
  );
}
