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

/** Contenedor base. Sin estado ni efectos. */
export function Card({ as, tone = 'plain', bigCorner = true, className, children, ...rest }: CardProps) {
  const Tag: ElementType = as ?? 'div';
  return (
    <Tag {...rest} className={cx('pese-card', `pese-card--${tone}`, bigCorner && 'pese-card--corner', className)}>
      {children}
    </Tag>
  );
}
