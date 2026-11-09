import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Label } from '../Label/Label';

export type InputType = 'text' | 'email' | 'tel' | 'url' | 'search' | 'password' | 'number';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type' | 'size'> & {
  /** `id` del campo. Es obligatorio y único en la página: une la etiqueta, la ayuda y el error con el campo. */
  id: string;
  /** Texto de la etiqueta. Siempre visible. */
  label: ReactNode;
  /** Tipo de campo. Usa el más específico (`email`, `tel`): el teléfono muestra el teclado correcto. */
  type?: InputType;
  /** Ayuda breve bajo la etiqueta («Con código de área»). */
  hint?: ReactNode;
  /** Mensaje de error. Dilo en palabras y di cómo corregirlo. Si existe, el campo se marca como inválido. */
  error?: ReactNode;
  /** Muestra «(opcional)» junto a la etiqueta. */
  optional?: boolean;
  /** Clase para el contenedor del campo (la etiqueta, el campo y sus mensajes). */
  wrapperClassName?: string;
};

/**
 * Campo de texto de una línea con su etiqueta, ayuda y error ya conectados.
 *
 * Une todo con `aria-describedby` y marca `aria-invalid` cuando hay error, así que no hay que
 * conectarlo a mano. No usa estado: tú decides cuándo mostrar el error (por ejemplo, al enviar el
 * formulario) y pasas el texto en `error`.
 *
 * **Cuándo usarlo:** nombre, correo, teléfono y otros datos cortos. Para textos largos, el área de texto.
 *
 * @example
 * ```tsx
 * <Input id="correo" name="correo" type="email" label="Correo" required autoComplete="email" />
 * <Input id="tel" name="tel" type="tel" label="Teléfono" hint="Con código de área" optional />
 * <Input id="nombre" name="nombre" label="Nombre" error="Escribe tu nombre para poder responderte." />
 * ```
 */
export function Input({
  id,
  label,
  type = 'text',
  hint,
  error,
  optional,
  required,
  className,
  wrapperClassName,
  ...rest
}: InputProps) {
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
      <input
        {...rest}
        id={id}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx('pese-input', className)}
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
