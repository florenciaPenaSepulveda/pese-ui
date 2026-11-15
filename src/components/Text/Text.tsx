import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type TextSize = 'lg' | 'md' | 'sm';
export type TextTone = 'default' | 'muted';

export type TextProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Elemento HTML. Por defecto `p`. */
  as?: 'p' | 'span' | 'div';
  /** lg: 18 px (texto de apoyo); md: 16 px (cuerpo); sm: 14 px (notas y textos legales). */
  size?: TextSize;
  /** default: color de texto; muted: texto de apoyo más suave (mantiene contraste AAA). */
  tone?: TextTone;
  /** Limita el ancho a unos 65 caracteres por línea, que es lo más cómodo de leer. */
  measure?: boolean;
  /** Contenido del texto. */
  children: ReactNode;
};

/**
 * Párrafo de texto con los tamaños y colores de la marca.
 *
 * **Cuándo usarlo:** para todo texto corrido. Para títulos, `Heading`. Con `measure` el texto no se
 * estira a todo el ancho en pantallas grandes.
 *
 * @example
 * ```tsx
 * <Text size="lg" measure>Conectamos tus ventas, tu inventario y tu facturación.</Text>
 * ```
 */
export function Text({ as = 'p', size = 'md', tone = 'default', measure, className, children, ...rest }: TextProps) {
  const Tag: ElementType = as;
  return (
    <Tag
      {...rest}
      className={cx('pese-text', `pese-text--${size}`, tone === 'muted' && 'pese-text--muted', measure && 'pese-text--measure', className)}
    >
      {children}
    </Tag>
  );
}
