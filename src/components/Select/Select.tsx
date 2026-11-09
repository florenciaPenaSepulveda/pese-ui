import type { ReactNode, SelectHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Label } from '../Label/Label';

export type SelectOption = {
  /** Valor que se envía con el formulario. */
  value: string;
  /** Texto que ve la persona. */
  label: string;
  /** Opción visible pero no elegible. */
  disabled?: boolean;
};

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'children' | 'size'> & {
  /** `id` del campo. Es obligatorio y único en la página. */
  id: string;
  /** Texto de la etiqueta. Siempre visible. */
  label: ReactNode;
  /** Opciones, en el orden en que se leen. */
  options: SelectOption[];
  /** Primera opción vacía («Elige una opción»). Si no la pones, la primera opción queda elegida. */
  placeholder?: string;
  /** Ayuda breve bajo la etiqueta. */
  hint?: ReactNode;
  /** Mensaje de error. Si existe, el campo se marca como inválido. */
  error?: ReactNode;
  /** Muestra «(opcional)» junto a la etiqueta. */
  optional?: boolean;
  /** Clase para el contenedor del campo. */
  wrapperClassName?: string;
};

/**
 * Lista desplegable nativa, con etiqueta, ayuda y error conectados igual que `Input`.
 *
 * Usa el `<select>` del navegador: funciona con teclado y en el celular sin trabajo extra.
 *
 * **Cuándo usarlo:** para elegir una opción entre unas 5 a 15. Con 2 a 4 opciones, mejor `RadioGroup`:
 * se ven todas a la vez.
 *
 * @example
 * ```tsx
 * <Select
 *   id="rubro" name="rubro" label="Rubro" placeholder="Elige una opción"
 *   options={[{ value: 'comercio', label: 'Comercio' }, { value: 'servicios', label: 'Servicios' }]}
 * />
 * ```
 */
export function Select({
  id,
  label,
  options,
  placeholder,
  hint,
  error,
  optional,
  required,
  className,
  wrapperClassName,
  ...rest
}: SelectProps) {
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
      <div className="pese-select">
        <select
          {...rest}
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cx('pese-input', 'pese-select__control', className)}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p id={errorId} className="pese-field__error">
          <span className="pese-field__error-label">Error: </span>
          {error}
        </p>
      )}
    </div>
  );
}
