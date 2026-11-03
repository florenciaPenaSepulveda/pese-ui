import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type Level = 0 | 1 | 2;

export type LevelCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  level: Level;
  title: string;
  description?: ReactNode;
  /** Texto del precio. Mientras no esté definido, usa un marcador como «[Precio a definir]». */
  price?: string;
  /** Una sola tarjeta destacada por fila: usa el fondo azul noche. */
  featured?: boolean;
  /** Etiqueta del sobretítulo. Por defecto «Nivel». */
  levelLabel?: string;
  children?: ReactNode;
};

/**
 * Tarjeta de nivel con hueco: la insignia amarilla encaja en la esquina superior derecha.
 * El nivel también está escrito en el sobretítulo, así que la insignia es decorativa.
 */
export function LevelCard({
  level,
  title,
  description,
  price,
  featured,
  levelLabel = 'Nivel',
  className,
  children,
  ...rest
}: LevelCardProps) {
  return (
    <article {...rest} className={cx('pese-level-card', featured && 'pese-level-card--featured', className)}>
      <div className="pese-level-card__body">
        <p className="pese-level-card__level">
          {levelLabel} {level}
        </p>
        <h3 className="pese-level-card__title">{title}</h3>
        {description ? <p className="pese-level-card__text">{description}</p> : null}
        {children}
        {price ? <p className="pese-level-card__price">{price}</p> : null}
      </div>
      <span className="pese-level-card__badge" aria-hidden="true">
        {level}
      </span>
    </article>
  );
}
