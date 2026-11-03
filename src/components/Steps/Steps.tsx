import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type StepStatus = 'done' | 'current' | 'todo';

export type Step = {
  title: string;
  description?: ReactNode;
  status: StepStatus;
};

export type StepsProps = Omit<HTMLAttributes<HTMLOListElement>, 'children'> & {
  items: Step[];
  /** Palabras de estado. Cámbialas para otro idioma. */
  labels?: Record<StepStatus, string>;
};

const DEFAULT_LABELS: Record<StepStatus, string> = {
  done: 'Hecho',
  current: 'En curso',
  todo: 'Pendiente',
};

/** Lista ordenada de pasos. Cada paso dice su estado con una palabra; el icono solo lo refuerza. */
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
