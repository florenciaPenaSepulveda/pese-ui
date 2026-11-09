import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Container } from '../Container/Container';

export type HeroTone = 'plain' | 'deep';

export type HeroProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Titular. Es el encabezado principal de la página: se escribe como `h1`. */
  title: ReactNode;
  /** Nivel del titular. Usa `h2` si la página ya tiene otro `h1`. Por defecto `h1`. */
  titleAs?: 'h1' | 'h2';
  /** Sobretítulo corto sobre el titular (por ejemplo, «Para negocios de La Serena»). */
  eyebrow?: ReactNode;
  /** Botones o enlaces de acción, normalmente un `Button` principal y uno secundario. */
  actions?: ReactNode;
  /** Imagen o ilustración opcional. Va al lado en pantalla grande y debajo del texto en pantalla chica. */
  media?: ReactNode;
  /** plain: fondo de la página; deep: azul noche con texto claro. */
  tone?: HeroTone;
  /** Texto de apoyo bajo el titular. */
  children?: ReactNode;
};

/**
 * Bloque principal de una portada: titular grande, texto de apoyo y botones, con una
 * imagen opcional al lado.
 *
 * El titular es el `h1` de la página, así que úsalo una vez. La imagen (`media`) es opcional:
 * sin ella, el texto ocupa el ancho disponible; con ella, en pantallas chicas queda debajo.
 * Si la imagen comunica algo, ponle `alt`; si solo decora, `alt=""`.
 *
 * **Cuándo usarlo:** al comienzo de la portada y de las páginas de servicio, dentro de `Layout`.
 * Sobre azul noche (`tone="deep"`) usa el botón de acento para la acción principal y el
 * secundario para la otra: son los que se leen bien sobre ese fondo.
 *
 * @example
 * ```tsx
 * <Hero
 *   eyebrow="Para negocios de La Serena"
 *   title="Software que encaja con tu negocio"
 *   actions={
 *     <>
 *       <Button href="/diagnostico-gratuito" size="lg">Pedir diagnóstico</Button>
 *       <Button href="/servicios" variant="secondary" size="lg">Ver servicios</Button>
 *     </>
 *   }
 * >
 *   Conectamos tus ventas, tu inventario y tu facturación en un solo lugar.
 * </Hero>
 * ```
 */
export function Hero({
  title,
  titleAs = 'h1',
  eyebrow,
  actions,
  media,
  tone = 'plain',
  className,
  children,
  ...rest
}: HeroProps) {
  const Title: ElementType = titleAs;
  return (
    <section {...rest} className={cx('pese-hero', `pese-hero--${tone}`, media ? 'pese-hero--has-media' : false, className)}>
      <Container size="wide" className="pese-hero__inner">
        <div className="pese-hero__content">
          {eyebrow && <p className="pese-hero__eyebrow">{eyebrow}</p>}
          <Title className="pese-hero__title">{title}</Title>
          {children && <div className="pese-hero__text">{children}</div>}
          {actions && <div className="pese-hero__actions">{actions}</div>}
        </div>
        {media && <div className="pese-hero__media">{media}</div>}
      </Container>
    </section>
  );
}
