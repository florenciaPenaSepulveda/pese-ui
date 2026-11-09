import type { FieldsetHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type RadioOption = {
  /** Valor que se envía con el formulario. */
  value: string;
  /** Texto de la opción. */
  label: ReactNode;
  /** Explicación breve bajo la opción. */
  hint?: ReactNode;
  /** Opción visible pero no elegible. */
  disabled?: boolean;
};

export type RadioGroupProps = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'id' | 'name' | 'defaultValue' | 'onChange' | 'value'> & {
  /** `id` base del grupo. Es obligatorio y único: de él salen los ids de cada opción y de los mensajes. */
  id: string;
  /** Nombre del campo en el formulario. Todas las opciones lo comparten. */
  name: string;
  /** Pregunta del grupo. Se lee antes de cada opción. */
  legend: ReactNode;
  /** Opciones, en el orden en que se leen. */
  options: RadioOption[];
  /** Valor elegido al comienzo. */
  defaultValue?: string;
  /** Marca el grupo como obligatorio. */
  required?: boolean;
  /** Muestra «(opcional)» junto a la pregunta. */
  optional?: boolean;
  /** Ayuda breve bajo la pregunta. */
  hint?: ReactNode;
  /** Mensaje de error. Si existe, el grupo se marca como inválido. */
  error?: ReactNode;
};

/**
 * Grupo de opciones donde se elige una sola, con su pregunta, ayuda y error.
 *
 * Es un `<fieldset>` con `<legend>` y botones de radio nativos: con teclado se mueve con las
 * flechas, y los lectores de pantalla leen la pregunta antes de cada opción.
 *
 * **Cuándo usarlo:** para 2 a 5 opciones que conviene ver todas a la vez («¿Cómo prefieres que te
 * contactemos?»). Con más opciones, `Select`.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   id="canal" name="canal" legend="¿Cómo prefieres que te contactemos?" required
 *   options={[{ value: 'correo', label: 'Correo' }, { value: 'telefono', label: 'Teléfono' }]}
 * />
 * ```
 */
export function RadioGroup({
  id,
  name,
  legend,
  options,
  defaultValue,
  required,
  optional,
  hint,
  error,
  className,
  ...rest
}: RadioGroupProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId, rest['aria-describedby']].filter(Boolean).join(' ') || undefined;
  return (
    <fieldset
      {...rest}
      id={id}
      aria-describedby={describedBy}
      className={cx('pese-choice', 'pese-radiogroup', error ? 'pese-choice--error' : false, className)}
    >
      <legend className="pese-label pese-radiogroup__legend">
        {legend}
        {required && <span className="pese-label__mark"> (obligatorio)</span>}
        {!required && optional && <span className="pese-label__mark"> (opcional)</span>}
      </legend>
      {hint && (
        <p id={hintId} className="pese-field__hint">
          {hint}
        </p>
      )}
      {options.map((o, i) => {
        const oid = `${id}-${i + 1}`;
        const ohint = o.hint ? `${oid}-hint` : undefined;
        return (
          <div key={o.value} className="pese-choice__item">
            <div className="pese-choice__row">
              <input
                id={oid}
                type="radio"
                name={name}
                value={o.value}
                defaultChecked={defaultValue === o.value}
                disabled={o.disabled}
                required={required}
                aria-describedby={ohint}
                aria-invalid={error ? true : undefined}
                className="pese-choice__input pese-choice__input--radio"
              />
              <label htmlFor={oid} className="pese-choice__label">
                {o.label}
              </label>
            </div>
            {o.hint && (
              <p id={ohint} className="pese-field__hint pese-choice__hint">
                {o.hint}
              </p>
            )}
          </div>
        );
      })}
      {error && (
        <p id={errorId} className="pese-field__error">
          <span className="pese-field__error-label">Error: </span>
          {error}
        </p>
      )}
    </fieldset>
  );
}
