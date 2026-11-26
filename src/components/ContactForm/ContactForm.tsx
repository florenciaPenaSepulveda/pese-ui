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

/** Campo de texto propio del sitio (por ejemplo, «negocio»). Va en la lista `fields` junto a los campos de la librería. */
export type ContactCustomField = {
  /** Atributo `name` del campo: así llega al servidor. */
  name: string;
  /** Etiqueta visible. */
  label: string;
  /** Tipo de campo. Por defecto `text`. */
  type?: 'text' | 'email' | 'tel' | 'url';
  /** Ayuda breve bajo la etiqueta. */
  hint?: ReactNode;
  /** Obligatorio. Si no, la etiqueta dice «(opcional)». */
  required?: boolean;
  /** Valor para `autocomplete` (por ejemplo, `organization`). */
  autoComplete?: string;
};

/** Un elemento de `fields`: el nombre de un campo de la librería o un campo propio. */
export type ContactFormItem = ContactField | ContactCustomField;

/** Ajustes del campo de consentimiento. */
export type ContactConsent = {
  /** `name` del campo. Por defecto `consentimiento`. */
  name?: string;
  /** Valor que se envía al marcarlo. Por defecto el del navegador (`on`). */
  value?: string;
  /** Texto de la casilla. Por defecto: «Acepto que PESE use mis datos…» con el enlace a la política. */
  label?: ReactNode;
};

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
  /** Dirección de la política de privacidad (va en el texto del consentimiento por defecto). */
  privacyHref?: string;
  /**
   * Qué campos mostrar y en qué orden. Mezcla nombres de la librería (`nombre`, `correo`, `telefono`,
   * `rubro`, `mensaje`, `consentimiento`) con campos propios. Por defecto, los seis de la librería.
   */
  fields?: ContactFormItem[];
  /** Cambia la etiqueta de un campo de la librería (por ejemplo, `{ nombre: 'Tu nombre' }`). */
  labels?: Partial<Record<ContactField, string>>;
  /** Campos ocultos que viajan con el formulario (por ejemplo, `{ origen: 'portada' }`). */
  hiddenFields?: Record<string, string>;
  /** Nombre, valor y texto del consentimiento. */
  consent?: ContactConsent;
  /** Prefijo de los `id` de los campos. Cámbialo si hay dos formularios en la misma página. */
  idPrefix?: string;
  /** Valores a mostrar en cada campo (por ejemplo, para devolverlos tras un error). */
  values?: Partial<Record<string, string>>;
  /** Errores por campo. Con al menos uno aparece el resumen de errores arriba. */
  errors?: Partial<Record<string, string>>;
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

const DEFAULT_FIELDS: ContactField[] = ['nombre', 'correo', 'telefono', 'rubro', 'mensaje', 'consentimiento'];

/**
 * Formulario de contacto: por defecto trae nombre, correo, teléfono, rubro, mensaje y consentimiento,
 * y se puede configurar con `fields`, `labels`, `hiddenFields` y `consent`.
 *
 * Es un formulario HTML normal: funciona sin JavaScript y envía a `action`. La validación la haces en
 * el servidor y devuelves `errors`, `values` y `status`; el componente muestra un resumen de errores
 * con enlaces a cada campo, el error en cada uno y el resultado del envío. Lleva un campo trampa
 * invisible (`sitio_web`) contra bots: si llega con texto, descarta el mensaje.
 *
 * **Cuándo usarlo:** en la página de contacto y en el llamado «Pedir diagnóstico». Si tu sitio pide
 * otros datos (por ejemplo, el nombre del negocio) o necesita campos ocultos, no armes el formulario
 * a mano: configúralo con `fields` y `hiddenFields`.
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
  fields = DEFAULT_FIELDS,
  labels = {},
  hiddenFields,
  consent = {},
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
  const id = (name: string) => `${idPrefix}-${name}`;
  const consentName = consent.name ?? 'consentimiento';
  // Los campos que de verdad se dibujan, en orden (el rubro solo si hay opciones).
  const items = fields.filter((f) => f !== 'rubro' || (rubros && rubros.length > 0));
  const fieldName = (f: ContactFormItem) => (typeof f === 'string' ? (f === 'consentimiento' ? consentName : f) : f.name);
  const fieldLabel = (f: ContactFormItem) => (typeof f === 'string' ? (labels[f] ?? LABELS[f]) : f.label);
  const errorList = items.filter((f) => errors[fieldName(f)]);

  const render = (f: ContactFormItem) => {
    if (typeof f !== 'string') {
      return (
        <Input
          key={f.name}
          id={id(f.name)}
          name={f.name}
          type={f.type}
          label={f.label}
          hint={f.hint}
          required={f.required}
          optional={!f.required}
          autoComplete={f.autoComplete}
          defaultValue={values[f.name]}
          error={errors[f.name]}
        />
      );
    }
    switch (f) {
      case 'nombre':
        return <Input key={f} id={id('nombre')} name="nombre" label={labels.nombre ?? 'Nombre'} required autoComplete="name" defaultValue={values.nombre} error={errors.nombre} />;
      case 'correo':
        return <Input key={f} id={id('correo')} name="correo" type="email" label={labels.correo ?? 'Correo'} required autoComplete="email" defaultValue={values.correo} error={errors.correo} />;
      case 'telefono':
        return (
          <Input
            key={f}
            id={id('telefono')}
            name="telefono"
            type="tel"
            label={labels.telefono ?? 'Teléfono'}
            hint="Con código de área, por ejemplo 51 2 123456"
            optional
            autoComplete="tel"
            defaultValue={values.telefono}
            error={errors.telefono}
          />
        );
      case 'rubro':
        return (
          <Select
            key={f}
            id={id('rubro')}
            name="rubro"
            label={labels.rubro ?? 'Rubro de tu negocio'}
            placeholder="Elige una opción"
            options={rubros ?? []}
            optional
            defaultValue={values.rubro}
            error={errors.rubro}
          />
        );
      case 'mensaje':
        return (
          <Textarea
            key={f}
            id={id('mensaje')}
            name="mensaje"
            label={labels.mensaje ?? 'Mensaje'}
            hint="Cuéntanos qué quieres resolver y cada cuánto te pasa."
            required
            defaultValue={values.mensaje}
            error={errors.mensaje}
          />
        );
      case 'consentimiento':
        return (
          <Checkbox
            key={f}
            id={id(consentName)}
            name={consentName}
            value={consent.value}
            required
            defaultChecked={values[consentName] === (consent.value ?? 'on')}
            error={errors[consentName]}
            label={
              consent.label ?? (
                <>
                  Acepto que PESE use mis datos para responderme
                  {privacyHref ? (
                    <>
                      , según la <Link href={privacyHref}>política de privacidad</Link>
                    </>
                  ) : null}
                </>
              )
            }
          />
        );
    }
  };

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
              <li key={fieldName(f)}>
                <a href={`#${id(fieldName(f))}`}>
                  {fieldLabel(f)}: {errors[fieldName(f)]}
                </a>
              </li>
            ))}
          </ul>
        </Notice>
      )}
      {hiddenFields && Object.entries(hiddenFields).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
      {items.map(render)}
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
