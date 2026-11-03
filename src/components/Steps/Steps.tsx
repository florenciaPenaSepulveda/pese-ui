import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type StepStatus = 'done' | 'current' | 'todo';

export type Step = {
  /** Nombre corto del paso. */
  title: string;
  /** Detalle opcional bajo el nombre. */
  description?: ReactNode;
  /** done: hecho; current: en curso; todo: pendiente. */
  status: StepStatus;
};

export type StepsProps = Omit<HTMLAttributes<HTMLOListElement>, 'children'> & {
  /** Pasos en orden. Cada uno lleva su estado. */
  items: Step[];
  /** Palabras de estado. Cámbialas para otro idioma. */
  labels?: Record<StepStatus, string>;
};

const DEFAULT_LABELS: Record<StepStatus, string> = {
  done: 'Hecho',
  current: 'En curso',
  todo: 'Pendiente',
};

/**
 * Lista ordenada de pasos con su estado: el recorrido de un proyecto o de un diagnóstico.
 *
 * **Cuándo usarla:** para mostrar el avance de un proceso. Cada paso dice su estado con una
 * palabra («Hecho», «En curso», «Pendiente»); el icono y el número solo lo refuerzan. Es una
 * lista `<ol>` real, por lo que los lectores de pantalla anuncian la posición.
 *
 * @example
 * ```tsx
 * <Steps items={[
 *   { title: 'Diagnóstico', status: 'done' },
 *   { title: 'Primer flujo', status: 'current', description: 'Conectamos ventas con inventario.' },
 *   { title: 'Mejoras mensuales', status: 'todo' },
 * ]} />
 * ```
 */
export function Steps({ items, labels = DEFAULT_LABELS, className, ...rest }: StepsProps) {
  return (
    <ol {...rest} className={cx('pese-steps', className)}>
      {items.map((item, i) => (
        <li key={`${i}-${item.title}`} className={cx('pese-steps__item', `pese-steps__item--${item.status}`)}>
          <span className="pese-steps__marker" aria-hidden="true">
            {item.status === 'done' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" focusable="false">
                <path d="M3.5 8.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              i + 1
            )}
          </span>
          <div className="pese-steps__text">
            <b className="pese-steps__title">{item.title}</b>
            <span className="pese-steps__status">{labels[item.status]}</span>
            {item.description ? <span className="pese-steps__desc">{item.description}</span> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
