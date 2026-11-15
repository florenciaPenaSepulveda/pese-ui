import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type NoticeTone = 'info' | 'ok' | 'warn' | 'danger';

export type NoticeProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** info: dato útil; ok: algo salió bien; warn: ojo con esto; danger: algo falló. */
  tone?: NoticeTone;
  /** Título corto. Si no lo pones, se usa la palabra del tono («Información», «Listo», «Atención», «Error»). */
  title?: ReactNode;
  /** Mensaje: qué pasó y qué puede hacer la persona. */
  children: ReactNode;
};

const LABEL: Record<NoticeTone, string> = { info: 'Información', ok: 'Listo', warn: 'Atención', danger: 'Error' };

/**
 * Aviso dentro de la página: confirma un envío, advierte algo o explica un error.
 *
 * Siempre dice el tipo con una palabra (no solo con color). No usa estado: tú decides cuándo mostrarlo.
 * Si aparece tras una acción (por ejemplo, al enviar un formulario), pasa `role="alert"` para que se anuncie.
 *
 * **Cuándo usarlo:** para mensajes que la persona debe leer. Para una etiqueta de una palabra, `Badge`;
 * para un error de un solo campo, el `error` de ese campo.
 *
 * @example
 * ```tsx
 * <Notice tone="ok" title="Mensaje enviado" role="status">Te respondemos en un día hábil.</Notice>
 * ```
 */
export function Notice({ tone = 'info', title, className, children, ...rest }: NoticeProps) {
  return (
    <div {...rest} className={cx('pese-notice', `pese-notice--${tone}`, className)}>
      <p className="pese-notice__title">{title ?? LABEL[tone]}</p>
      <div className="pese-notice__body">{children}</div>
    </div>
  );
}
