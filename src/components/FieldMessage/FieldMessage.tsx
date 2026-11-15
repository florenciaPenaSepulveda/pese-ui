import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type FieldHintProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
  /** `id` del texto. Se enlaza desde el campo con `aria-describedby`. */
  id?: string;
  /** Texto de ayuda. */
  children: ReactNode;
};

/**
 * Ayuda breve de un campo («Con código de área»), en texto de apoyo.
 *
 * Los campos de la librería (`Input`, `Select`, `Textarea`…) ya la incluyen y la conectan. Úsala suelta
 * solo si armas un campo propio: pásale un `id` y ponlo en el `aria-describedby` del control.
 *
 * @example
 * ```tsx
 * <FieldHint id="tel-hint">Con código de área</FieldHint>
 * ```
 */
export function FieldHint({ className, children, ...rest }: FieldHintProps) {
  return (
    <p {...rest} className={cx('pese-field__hint', className)}>
      {children}
    </p>
  );
}

export type FieldErrorProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
  /** `id` del mensaje. Se enlaza desde el campo con `aria-describedby`. */
  id?: string;
  /** Palabra que abre el mensaje, para que el error no dependa solo del color. Por defecto «Error: ». */
  prefix?: string;
  /** Qué está mal y cómo corregirlo. */
  children: ReactNode;
};

/**
 * Mensaje de error de un campo, sobre fondo rojizo suave y abierto con la palabra «Error».
 *
 * Los campos de la librería ya lo incluyen cuando reciben `error`. Úsalo suelto solo si armas un campo propio.
 *
 * @example
 * ```tsx
 * <FieldError id="correo-error">Falta la @. Por ejemplo: nombre@empresa.cl</FieldError>
 * ```
 */
export function FieldError({ prefix = 'Error: ', className, children, ...rest }: FieldErrorProps) {
  return (
    <p {...rest} className={cx('pese-field__error', className)}>
      <span className="pese-field__error-label">{prefix}</span>
      {children}
    </p>
  );
}
