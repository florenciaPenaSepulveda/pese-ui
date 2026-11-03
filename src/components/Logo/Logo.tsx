import type { SVGAttributes } from 'react';
import { cx } from '../../utils/cx';

export type LogoVariant = 'logo' | 'mark' | 'wordmark';
/** auto: sigue el tema claro/oscuro; ink: una sola tinta; white: blanco con círculo amarillo. */
export type LogoTone = 'auto' | 'ink' | 'white';

export type LogoProps = Omit<SVGAttributes<SVGSVGElement>, 'children' | 'viewBox'> & {
  variant?: LogoVariant;
  tone?: LogoTone;
  /** Texto accesible. Por defecto «PESE». Pasa `null` si el logo es decorativo. */
  title?: string | null;
};

const VIEWBOX: Record<LogoVariant, string> = {
  logo: '0 0 203 64',
  mark: '0 0 64 64',
  wordmark: '0 0 119 35',
};

const MARK = (
  <>
    <path className="pese-logo__left" d="M10 4H30V60H10A6 6 0 0 1 4 54V10A6 6 0 0 1 10 4Z" />
    <path className="pese-logo__right" d="M34 4H54A6 6 0 0 1 60 10V54A6 6 0 0 1 54 60H34V41.31A12 12 0 0 0 34 18.69Z" />
    <path className="pese-logo__dot" d="M22 30a8 8 0 1 0 16 0a8 8 0 1 0-16 0Z" />
  </>
);

const LETTERS = (
  <g className="pese-logo__letters" fill="none" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 30V2H14A8 8 0 0 1 14 18H4" transform="translate(-0.5 1.5)" />
    <path d="M20 2H4V30H20M4 16H17" transform="translate(33.5 1.5)" />
    <path d="M19 7C19 4 16 2 12 2C8 2 5 4 5 8C5 12 8.5 14 12 16C15.5 18 19 20 19 24C19 28 16 30 12 30C8 30 5 28 5 25" transform="translate(64.5 1.5)" />
    <path d="M20 2H4V30H20M4 16H17" transform="translate(95.5 1.5)" />
  </g>
);

/** Logo de PESE en SVG en línea. Los colores salen de las variables del tema. */
export function Logo({ variant = 'logo', tone = 'auto', title = 'PESE', className, ...rest }: LogoProps) {
  const a11y = title ? { role: 'img' as const, 'aria-label': title } : { 'aria-hidden': true as const };
  return (
    <svg
      {...rest}
      {...a11y}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={VIEWBOX[variant]}
      focusable="false"
      className={cx('pese-logo', `pese-logo--${tone}`, className)}
    >
      {variant === 'wordmark' ? (
        LETTERS
      ) : variant === 'mark' ? (
        MARK
      ) : (
        <>
          {MARK}
          <g transform="translate(84 14.5)">{LETTERS}</g>
        </>
      )}
    </svg>
  );
}
