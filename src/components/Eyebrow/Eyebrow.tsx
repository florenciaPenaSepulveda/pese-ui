import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type EyebrowProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
  /** Texto corto (una o pocas palabras). Se escribe en mayúsculas visualmente, pero el HTML conserva tu texto. */
  children: ReactNode;
};

/**
 * Sobretítulo: una línea corta sobre un título que dice de qué trata («Para negocios de La Serena»).
 *
 * Usa la tipografía de datos de la marca (JetBrains Mono) en mayúsculas. Hereda el color del bloque donde
 * está, así que sirve sobre el fondo claro y sobre azul noche; en claro, color de texto de apoyo.
 *
 * **Cuándo usarlo:** encima de un `Heading`, una sola vez por bloque. No lo uses como título: no es un encabezado.
 *
 * @example
 * ```tsx
 * <Eyebrow>Para negocios de La Serena</Eyebrow>
 * ```
 */
export function Eyebrow({ className, children, ...rest }: EyebrowProps) {
  return (
    <p {...rest} className={cx('pese-eyebrow', className)}>
      {children}
    </p>
  );
}
