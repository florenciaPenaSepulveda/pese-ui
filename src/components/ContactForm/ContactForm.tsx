import type { FormHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input } from '../Input/Input';
import { Link } from '../Link/Link';
import { Notice, type NoticeTone } from '../Notice/Notice';
import { Select, type SelectOption } from '../Select/Select';
import { Textarea } from '../Textarea/Textarea';

export type ContactField = 'nombre' | 'correo' | 'telefono' | 'rubro' | 'mensaje' | 'consentimiento';

export type ContactFormStatus = {
  /** Tipo de aviso: `ok` tras enviar, `danger` si falló el envío. */
  tone: NoticeTone;
  /** Título corto del aviso. */
  title: string;
  /** Mensaje del aviso. */
  message: ReactNode;
};

export type ContactFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'action' | 'children' | 'method'> & {
  /** Dirección que recibe el formulario. */
  action: string;
  /** Método de envío. Por defecto `post`. */
  method?: 'post' | 'get';
  /** Dirección de la política de privacidad (va en el texto del consentimiento). */
  privacyHref: string;
  /** Prefijo de los `id` de los campos. Cámbialo si hay dos formularios en la misma página. */
  idPrefix?: string;
  /** Valores a mostrar en cada campo (por ejemplo, para devolverlos tras un error). */
  values?: Partial<Record<ContactField, string>>;
  /** Errores por campo. Con al menos uno aparece el resumen de errores arriba. */
  errors?: Partial<Record<ContactField, string>>;
  /** Opciones del rubro. Si no las pasas, el campo no aparece. */
  rubros?: SelectOption[];
  /** Resultado del envío: mensaje de éxito o de falla sobre el formulario. */
  status?: ContactFormStatus;
  /** Texto del botón de envío. */
  submitLabel?: string;
  /** Muestra el botón en estado de carga mientras se envía. */
  loading?: boolean;
  /** Título del resumen de errores. */
  errorSummaryTitle?: string;
};

const LABELS: Record<ContactField, string> = {
  nombre: 'Nombre',
  correo: 'Correo',
  telefono: 'Teléfono',
  rubro: 'Rubro',
  mensaje: 'Mensaje',
  consentimiento: 'Consentimiento',
};

/**
 * Formulario de contacto completo: nombre, correo, teléfono, rubro, mensaje y consentimiento.
 *
 * Es un formulario HTML normal: funciona sin JavaScript y envía a `action`. La validación la haces en
 * el servidor y devuelves `errors`, `values` y `status`; el componente muestra un resumen de errores
 * con enlaces a cada campo, el error en cada uno y el resultado del envío. Lleva un campo trampa
 * invisible (`sitio_web`) contra bots: si llega con texto, descarta el mensaje.
 *
 * **Cuándo usarlo:** en la página de contacto y en el llamado «Pedir diagnóstico».
 *
 * @example
 * ```tsx
 * <ContactForm action="/api/contacto" privacyHref="/privacidad" rubros={[{ value: 'comercio', label: 'Comercio' }]} />
 * ```
 */
export function ContactForm({
  action,
  method = 'post',
  privacyHref,
  idPrefix = 'contacto',
  values = {},
  errors = {},
  rubros,
  status,
  submitLabel = 'Enviar mensaje',
  loading,
  errorSummaryTitle = 'Revisa estos campos',
  className,
  ...rest
}: ContactFormProps) {
  const id = (f: ContactField) => `${idPrefix}-${f}`;
  const errorList = (Object.keys(LABELS) as ContactField[]).filter((f) => errors[f]);
  return (
    <form {...rest} action={action} method={method} className={cx('pese-form', className)}>
      {status && (
        <Notice tone={status.tone} title={status.title} role={status.tone === 'danger' ? 'alert' : 'status'}>
          {status.message}
        </Notice>
      )}
      {errorList.length > 0 && (
        <Notice tone="danger" title={errorSummaryTitle} role="alert">
          <ul>
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${id(f)}`}>
                  {LABELS[f]}: {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </Notice>
      )}
      <Input id={id('nombre')} name="nombre" label="Nombre" required autoComplete="name" defaultValue={values.nombre} error={errors.nombre} />
      <Input id={id('correo')} name="correo" type="email" label="Correo" required autoComplete="email" defaultValue={values.correo} error={errors.correo} />
      <Input
        id={id('telefono')}
        name="telefono"
        type="tel"
        label="Teléfono"
        hint="Con código de área, por ejemplo 51 2 123456"
        optional
        autoComplete="tel"
        defaultValue={values.telefono}
        error={errors.telefono}
      />
      {rubros && rubros.length > 0 && (
        <Select
          id={id('rubro')}
          name="rubro"
          label="Rubro de tu negocio"
          placeholder="Elige una opción"
          options={rubros}
          optional
          defaultValue={values.rubro}
          error={errors.rubro}
        />
      )}
      <Textarea
        id={id('mensaje')}
        name="mensaje"
        label="Mensaje"
        hint="Cuéntanos qué quieres resolver y cada cuánto te pasa."
        required
        defaultValue={values.mensaje}
        error={errors.mensaje}
      />
      <Checkbox
        id={id('consentimiento')}
        name="consentimiento"
        required
        defaultChecked={values.consentimiento === 'on'}
        error={errors.consentimiento}
        label={
          <>
            Acepto que PESE use mis datos para responderme, según la{' '}
            <Link href={privacyHref}>política de privacidad</Link>
          </>
        }
      />
      {/* Campo trampa: las personas no lo ven ni lo alcanzan con teclado; los bots lo llenan. */}
      <div className="pese-form__trap" aria-hidden="true">
        <label>
          No llenes este campo
          <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="pese-form__actions">
        <Button type="submit" size="lg" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
