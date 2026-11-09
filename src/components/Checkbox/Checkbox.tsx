import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type' | 'size'> & {
  /** `id` de la casilla. Es obligatorio y único en la página. */
  id: string;
  /** Texto junto a la casilla. Puede incluir un `Link` (por ejemplo, a la política de privacidad). */
  label: ReactNode;
  /** Ayuda breve bajo el texto. */
  hint?: ReactNode;
  /** Mensaje de error. Si existe, la casilla se marca como inválida. */
  error?: ReactNode;
  /** Clase para el contenedor. */
  wrapperClassName?: string;
};

/**
 * Casilla de verificación con su texto, ayuda y error.
 *
 * Es la casilla nativa con otro aspecto: funciona con teclado y con lectores de pantalla.
 * Toda el área del texto es clicable y mide al menos 44 px de alto.
 *
 * **Cuándo usarla:** para aceptar algo (por ejemplo, el consentimiento de datos en el formulario de contacto)
 * o para marcar varias opciones a la vez. Para elegir solo una, `RadioGroup`.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   id="acepto" name="acepto" required
 *   label={<>Acepto la <Link href="/privacidad">política de privacidad</Link></>}
 * />
 * ```
 */
export function Checkbox({ id, label, hint, error, className, wrapperClassName, ...rest }: CheckboxProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId, rest['aria-describedby']].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cx('pese-choice', error ? 'pese-choice--error' : false, wrapperClassName)}>
      <div className="pese-choice__row">
        <input
          {...rest}
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cx('pese-choice__input', 'pese-choice__input--checkbox', className)}
        />
        <label htmlFor={id} className="pese-choice__label">
          {label}
        </label>
      </div>
      {hint && (
        <p id={hintId} className="pese-field__hint pese-choice__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="pese-field__error">
          <span className="pese-field__error-label">Error: </span>
          {error}
        </p>
      )}
    </div>
  );
}
