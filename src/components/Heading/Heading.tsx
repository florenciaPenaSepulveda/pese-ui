import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm';

export type HeadingProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> & {
  /** Nivel del encabezado en el esquema de la página (1 a 6). Lo leen los lectores de pantalla. */
  level: HeadingLevel;
  /** Tamaño visual. Si no lo pones, sale del nivel: 1 display, 2 xl, 3 lg, 4 md, 5 y 6 sm. */
  size?: HeadingSize;
  /** Texto del encabezado. */
  children: ReactNode;
};

const DEFAULT_SIZE: Record<HeadingLevel, HeadingSize> = { 1: 'display', 2: 'xl', 3: 'lg', 4: 'md', 5: 'sm', 6: 'sm' };

/**
 * Encabezado con el nivel y el tamaño separados: el nivel ordena la página, el tamaño solo decide cómo se ve.
 *
 * **Cuándo usarlo:** para todo título. Un solo `level={1}` por página y sin saltarse niveles (un 2 va
 * antes que un 3). Si un título de nivel 2 debe verse más chico, cambia el `size`, no el nivel.
 *
 * @example
 * ```tsx
 * <Heading level={2}>Cómo trabajamos</Heading>
 * <Heading level={2} size="md">Un título de nivel 2 que se ve más chico</Heading>
 * ```
 */
export function Heading({ level, size, className, children, ...rest }: HeadingProps) {
  const Tag: ElementType = `h${level}`;
  return (
    <Tag {...rest} className={cx('pese-heading', `pese-heading--${size ?? DEFAULT_SIZE[level]}`, className)}>
      {children}
    </Tag>
  );
}
