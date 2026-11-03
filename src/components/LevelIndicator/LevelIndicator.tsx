import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { Level } from '../LevelCard/LevelCard';

export type LevelIndicatorProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  level: Level;
  /** Frase bajo la barra. Por defecto «Estás en el Nivel N». Pasa `null` para ocultarla. */
  label?: string | null;
};

/** Barra de tres tramos que muestra en qué nivel está un cliente. */
export function LevelIndicator({ level, label, className, ...rest }: LevelIndicatorProps) {
  const text = label === undefined ? `Estás en el Nivel ${level}` : label;
  return (
    <div {...rest} className={cx('pese-levels', className)}>
      <div className="pese-levels__bar" role="img" aria-label={`Nivel ${level} de 2`}>
        {[0, 1, 2].map((i) => (
          <i key={i} className={cx('pese-levels__step', i <= level && 'pese-levels__step--on')} />
        ))}
      </div>
      {text ? <p className="pese-levels__label">{text}</p> : null}
    </div>
  );
}
