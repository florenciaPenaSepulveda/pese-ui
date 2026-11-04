import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type Level = 0 | 1 | 2;

export type LevelCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Nivel de servicio: 0 (diagnóstico gratuito), 1 o 2. Se escribe en el sobretítulo y en la insignia. */
  level: Level;
  /** Nombre del nivel, por ejemplo «Primer flujo». */
  title: string;
  /** Frase breve que explica qué incluye el nivel. */
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
 * Tarjeta de nivel de servicio con la insignia amarilla encajada en la esquina superior derecha.
 *
 * **Cuándo usarla:** en la página de niveles y en las secciones que comparan lo que incluye
 * cada uno. Destaca **una sola** tarjeta por fila con `featured`. El nivel también está escrito
 * en el sobretítulo, así que la insignia es solo decorativa.
 *
 * @example
 * ```tsx
 * <LevelCard level={1} title="Primer flujo" description="Un proceso conectado." price="[Precio a definir]" featured>
 *   <Button variant="accent" href="/diagnostico-gratuito">Pedir diagnóstico</Button>
 * </LevelCard>
 * ```
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
