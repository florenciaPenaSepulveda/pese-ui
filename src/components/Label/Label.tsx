import type { LabelHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type LabelProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children' | 'htmlFor'> & {
  /** `id` del campo al que nombra. Es obligatorio: sin él la etiqueta no queda asociada. */
  htmlFor: string;
  /** Marca el campo como obligatorio con la palabra «obligatorio» (no solo un asterisco). */
  required?: boolean;
  /** Marca el campo como opcional con la palabra «opcional». */
  optional?: boolean;
  /** Texto de la etiqueta. */
  children: ReactNode;
};

/**
 * Etiqueta de un campo de formulario, siempre visible sobre el campo.
 *
 * **Cuándo usarla:** con todo campo. El placeholder no reemplaza a la etiqueta. Marca solo lo que
 * se aparta de la regla del formulario: si casi todo es obligatorio, marca lo opcional.
 *
 * @example
 * ```tsx
 * <Label htmlFor="correo" required>Correo</Label>
 * ```
 */
export function Label({ htmlFor, required, optional, className, children, ...rest }: LabelProps) {
  return (
    <label {...rest} htmlFor={htmlFor} className={cx('pese-label', className)}>
      {children}
      {required && <span className="pese-label__mark"> (obligatorio)</span>}
      {!required && optional && <span className="pese-label__mark"> (opcional)</span>}
    </label>
  );
}
