import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type BadgeTone = 'neutral' | 'brand' | 'accent';

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  tone?: BadgeTone;
  children: ReactNode;
};

/** Etiqueta corta (por ejemplo «Nuevo» o «Nivel 1»). */
export function Badge({ tone = 'neutral', className, children, ...rest }: BadgeProps) {
  return (
    <span {...rest} className={cx('pese-badge', `pese-badge--${tone}`, className)}>
      {children}
    </span>
  );
}

export type StatusTone = 'ok' | 'warn' | 'danger';

export type StatusProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  tone: StatusTone;
  /** Palabra que dice el estado. Es obligatoria: el color y el icono nunca van solos. */
  label: string;
};

const PATHS: Record<StatusTone, string> = {
  ok: 'M3.5 8.5l3 3 6-6.5',
  warn: 'M8 3.5v5.5M8 12v.01',
  danger: 'M4.5 4.5l7 7M11.5 4.5l-7 7',
};

/** Estado con icono y palabra: «Conectado», «Pendiente», «Con error». */
export function Status({ tone, label, className, ...rest }: StatusProps) {
  return (
    <span {...rest} className={cx('pese-status', `pese-status--${tone}`, className)}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d={PATHS[tone]} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
}
