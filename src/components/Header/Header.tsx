import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { Logo } from '../Logo/Logo';

export type HeaderLink = {
  /** Texto del enlace. */
  label: string;
  /** Destino del enlace. */
  href: string;
  /** Marca la página actual: se subraya, se pone en negrita y se anuncia con `aria-current="page"`. */
  current?: boolean;
};

export type HeaderProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Enlaces de la navegación, en el orden en que se leen. */
  links: HeaderLink[];
  /** Botón de llamada a la acción al final de la navegación (por ejemplo, «Pedir diagnóstico»). */
  cta?: { label: string; href: string };
  /** Logo. Por defecto, el logo horizontal de PESE. */
  logo?: ReactNode;
  /** Destino del logo. Por defecto, la portada (`/`). */
  homeHref?: string;
  /** Texto accesible del enlace del logo. */
  homeLabel?: string;
  /** Nombre de la navegación para lectores de pantalla (si hay otra, como el pie, deben distinguirse). */
  navLabel?: string;
  /** Texto del botón que abre el menú en pantallas chicas. */
  menuLabel?: string;
};

/**
 * Cabecera del sitio: logo, navegación y un botón de acción.
 *
 * En pantallas grandes los enlaces van en fila. En pantallas chicas se recogen en un menú que
 * se abre y se cierra con `<details>`, sin JavaScript: funciona con teclado, lo anuncian los
 * lectores de pantalla y la página llega completa desde el servidor. Si el navegador no sabe
 * mostrar el contenido de un `<details>` cerrado en pantalla grande, conserva el botón «Menú»
 * en todos los tamaños.
 *
 * **Cuándo usarla:** una vez por página, en la propiedad `header` de `Layout`. Marca la página
 * actual con `current`.
 *
 * @example
 * ```tsx
 * <Header
 *   links={[
 *     { label: 'Servicios', href: '/servicios', current: true },
 *     { label: 'Cómo trabajamos', href: '/como-trabajamos' },
 *     { label: 'Blog', href: '/blog' },
 *   ]}
 *   cta={{ label: 'Pedir diagnóstico', href: '/diagnostico-gratuito' }}
 * />
 * ```
 */
export function Header({
  links,
  cta,
  logo,
  homeHref = '/',
  homeLabel = 'PESE, ir al inicio',
  navLabel = 'Principal',
  menuLabel = 'Menú',
  className,
  ...rest
}: HeaderProps) {
  return (
    <header {...rest} className={cx('pese-header', className)}>
      <Container size="wide" className="pese-header__inner">
        <a className="pese-header__home" href={homeHref} aria-label={homeLabel}>
          {logo ?? <Logo title={null} />}
        </a>
        <nav className="pese-header__nav" aria-label={navLabel}>
          <details className="pese-header__menu">
            <summary className="pese-header__toggle">{menuLabel}</summary>
            <ul className="pese-header__list">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    className={cx('pese-header__link', link.current && 'pese-header__link--current')}
                    href={link.href}
                    aria-current={link.current ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {cta && (
                <li className="pese-header__cta">
                  <Button href={cta.href}>{cta.label}</Button>
                </li>
              )}
            </ul>
          </details>
        </nav>
      </Container>
    </header>
  );
}
