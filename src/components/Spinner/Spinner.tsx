import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type SpinnerSize = 'sm' | 'md';

export type SpinnerProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Tamaño del anillo: 16 px (`sm`, para ir dentro de un botón) o 32 px (`md`). */
  size?: SpinnerSize;
  /** Texto para lectores de pantalla. Por defecto «Cargando». */
  label?: string;
  /** Muestra el texto al lado del anillo. Se muestra siempre cuando la persona pide menos movimiento. */
  showLabel?: boolean;
};

/**
 * Indicador de que algo está cargando.
 *
 * El anillo gira solo si la persona no pidió «reducir movimiento»; en ese caso se queda quieto y
 * muestra la palabra. Anuncia su texto con `role="status"`.
 *
 * **Cuándo usarlo:** cuando una acción tarda más de un segundo (por ejemplo, el envío del formulario).
 * Si es un botón, el propio `Button` ya acepta `loading`.
 *
 * @example
 * ```tsx
 * <Spinner label="Enviando tu mensaje" showLabel />
 * ```
 */
export function Spinner({ size = 'md', label = 'Cargando', showLabel, className, ...rest }: SpinnerProps) {
  return (
    <span
      role="status"
      {...rest}
      className={cx('pese-spinner', `pese-spinner--${size}`, showLabel && 'pese-spinner--labelled', className)}
    >
      <span className="pese-spinner__ring" aria-hidden="true" />
      <span className="pese-spinner__label">{label}</span>
    </span>
  );
}
