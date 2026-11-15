import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Badge } from '../Badge/Badge';
import { Heading } from '../Heading/Heading';

export type ArticleCardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Título del artículo. Es el enlace de toda la tarjeta. */
  title: string;
  /** Dirección del artículo. */
  href: string;
  /** Resumen de una o dos frases. */
  excerpt?: string;
  /** Categoría («Automatización», «Gestión»). */
  category?: string;
  /** Fecha en formato ISO (2026-11-09). Va en el atributo `dateTime`. */
  date?: string;
  /** Fecha escrita como se lee («9 de noviembre de 2026»). Si no la pasas, no se muestra la fecha. */
  dateLabel?: string;
  /** Tiempo de lectura («5 min de lectura»). */
  readingTime?: string;
  /** Imagen de portada (por ejemplo, un `Image`). Si es decorativa, con `alt=""`. */
  image?: ReactNode;
  /** Nivel del título según dónde caiga en la página. Por defecto 3. */
  titleLevel?: 2 | 3 | 4;
};

/**
 * Tarjeta de un artículo del blog: portada, categoría, título, resumen y fecha.
 *
 * Toda la tarjeta es clicable, pero hay un solo enlace (el título), así que los lectores de pantalla no
 * oyen el mismo destino varias veces.
 *
 * **Cuándo usarla:** en el listado del blog y en «artículos relacionados».
 *
 * @example
 * ```tsx
 * <ArticleCard href="/blog/ordenar-inventario" title="Cómo ordenar tu inventario" category="Gestión"
 *   excerpt="Tres pasos para dejar de contar a mano." date="2026-11-09" dateLabel="9 de noviembre de 2026" readingTime="5 min de lectura" />
 * ```
 */
export function ArticleCard({
  title,
  href,
  excerpt,
  category,
  date,
  dateLabel,
  readingTime,
  image,
  titleLevel = 3,
  className,
  ...rest
}: ArticleCardProps) {
  return (
    <article {...rest} className={cx('pese-article', className)}>
      {image && <div className="pese-article__media">{image}</div>}
      <div className="pese-article__body">
        {category && (
          <div>
            <Badge tone="brand">{category}</Badge>
          </div>
        )}
        <Heading level={titleLevel} size="lg">
          <a className="pese-article__link" href={href}>
            {title}
          </a>
        </Heading>
        {excerpt && <p className="pese-article__excerpt">{excerpt}</p>}
        {(dateLabel || readingTime) && (
          <p className="pese-article__meta">
            {dateLabel && <time dateTime={date}>{dateLabel}</time>}
            {dateLabel && readingTime && <span aria-hidden="true"> · </span>}
            {readingTime && <span>{readingTime}</span>}
          </p>
        )}
      </div>
    </article>
  );
}
