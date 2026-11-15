import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type DividerProps = Omit<HTMLAttributes<HTMLHRElement>, 'children'> & {
  /** Línea más marcada (`line-strong`). Por defecto, una línea suave. */
  strong?: boolean;
};

/**
 * Línea fina que separa dos bloques de contenido.
 *
 * Es un `<hr>`: los lectores de pantalla lo anuncian como un cambio de tema. Si solo quieres
 * espacio entre dos bloques, usa margen y no un separador.
 *
 * @example
 * ```tsx
 * <Divider />
 * ```
 */
export function Divider({ strong, className, ...rest }: DividerProps) {
  return <hr {...rest} className={cx('pese-divider', strong && 'pese-divider--strong', className)} />;
}
