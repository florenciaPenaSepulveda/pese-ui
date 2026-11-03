import type { ReactElement, SVGAttributes } from 'react';
import { cx } from '../../utils/cx';

export type IconName = 'conectar' | 'inventario' | 'facturacion' | 'diagnostico' | 'soporte';

export type IconProps = Omit<SVGAttributes<SVGSVGElement>, 'children' | 'viewBox'> & {
  name: IconName;
  /** Lado en píxeles. Por defecto 24. */
  size?: number;
  /** Texto accesible. Sin él, el icono es decorativo (`aria-hidden`) y debe ir junto a una palabra. */
  label?: string;
};

const SHAPES: Record<IconName, { line: ReactElement; dot: [number, number] }> = {
  conectar: {
    line: (
      <>
        <rect x="3" y="9" width="10" height="14" rx="3" />
        <rect x="19" y="9" width="10" height="14" rx="3" />
        <path d="M13 16H19" />
      </>
    ),
    dot: [16, 16],
  },
  inventario: {
    line: (
      <>
        <path d="M5 10L16 5L27 10V22L16 27L5 22Z" />
        <path d="M5 10L16 15L27 10M16 15V27" />
      </>
    ),
    dot: [16, 15],
  },
  facturacion: {
    line: (
      <>
        <rect x="7" y="4" width="18" height="24" rx="3" />
        <path d="M11 11H21M11 16H21" />
      </>
    ),
    dot: [21, 22],
  },
  diagnostico: {
    line: (
      <>
        <circle cx="14" cy="14" r="9" />
        <path d="M21 21L28 28" />
      </>
    ),
    dot: [14, 14],
  },
  soporte: {
    line: (
      <>
        <rect x="4" y="5" width="24" height="17" rx="4" />
        <path d="M11 22V28L17 22" />
      </>
    ),
    dot: [16, 13.5],
  },
};

/** Icono de línea de PESE: trazo `ink` y un solo punto de acento. */
export function Icon({ name, size = 24, label, className, ...rest }: IconProps) {
  const shape = SHAPES[name];
  const a11y = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <svg
      {...rest}
      {...a11y}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      focusable="false"
      className={cx('pese-icon', className)}
    >
      <g className="pese-icon__line" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {shape.line}
      </g>
      <circle className="pese-icon__dot" cx={shape.dot[0]} cy={shape.dot[1]} r="3" />
    </svg>
  );
}
