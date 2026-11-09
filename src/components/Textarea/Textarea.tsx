import type { ReactNode, TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Label } from '../Label/Label';

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
  /** `id` del campo. Es obligatorio y único en la página: une la etiqueta, la ayuda y el error con el campo. */
  id: string;
  /** Texto de la etiqueta. Siempre visible. */
  label: ReactNode;
  /** Ayuda breve bajo la etiqueta. */
  hint?: ReactNode;
  /** Mensaje de error. Dilo en palabras y di cómo corregirlo. Si existe, el campo se marca como inválido. */
  error?: ReactNode;
  /** Muestra «(opcional)» junto a la etiqueta. */
  optional?: boolean;
  /** Clase para el contenedor del campo. */
  wrapperClassName?: string;
};

/**
 * Campo de texto de varias líneas, con etiqueta, ayuda y error conectados igual que `Input`.
 *
 * **Cuándo usarlo:** mensajes y descripciones largas (por ejemplo, «Cuéntanos qué quieres resolver»).
 * Para datos cortos, `Input`. Se puede estirar hacia abajo, no hacia los lados.
 *
 * @example
 * ```tsx
 * <Textarea id="mensaje" name="mensaje" label="Mensaje" rows={5} required />
 * ```
 */
export function Textarea({
  id,
  label,
  hint,
  error,
  optional,
  required,
  rows = 5,
  className,
  wrapperClassName,
  ...rest
}: TextareaProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId, rest['aria-describedby']].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cx('pese-field', error ? 'pese-field--error' : false, wrapperClassName)}>
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      {hint && (
        <p id={hintId} className="pese-field__hint">
          {hint}
        </p>
      )}
      <textarea
        {...rest}
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx('pese-input', 'pese-textarea', className)}
      />
      {error && (
        <p id={errorId} className="pese-field__error">
          <span className="pese-field__error-label">Error: </span>
          {error}
        </p>
      )}
    </div>
  );
}
