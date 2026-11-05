import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Container } from '../Container/Container';
import { Logo } from '../Logo/Logo';

export type FooterTone = 'plain' | 'deep';

export type FooterLink = {
  /** Texto del enlace. */
  label: string;
  /** Destino del enlace. */
  href: string;
};

export type FooterGroup = {
  /** Título de la columna (por ejemplo, «Servicios»). Se escribe como encabezado de nivel 2. */
  title: string;
  /** Enlaces de la columna, en el orden en que se leen. */
  links: FooterLink[];
};

export type FooterProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Columnas de enlaces del sitio. */
  groups?: FooterGroup[];
  /** Frase bajo el logo (por ejemplo, el lema de la marca). */
  description?: ReactNode;
  /** Datos de contacto: correo, zona de servicio, redes. Se muestran bajo el título `contactTitle`. */
  contact?: ReactNode;
  /** Título de la columna de contacto. */
  contactTitle?: string;
  /** Texto legal de la franja inferior (por ejemplo, «© PESE. Todos los derechos reservados.»). */
  legal?: ReactNode;
  /** Enlaces de la franja inferior (privacidad, términos). */
  legalLinks?: FooterLink[];
  /** plain: fondo de la página con una línea arriba; deep: azul noche con texto claro. */
  tone?: FooterTone;
  /** Logo. Por defecto, el logo horizontal de PESE (en blanco si el tono es `deep`). */
  logo?: ReactNode;
  /** Destino del logo. Por defecto, la portada (`/`). */
  homeHref?: string;
  /** Texto accesible del enlace del logo. */
  homeLabel?: string;
  /** Nombre de la navegación para lectores de pantalla; debe distinguirse del de la cabecera. */
  navLabel?: string;
};

/**
 * Pie de página: logo y lema, columnas de enlaces, contacto y una franja legal.
 *
 * Todo es opcional salvo lo que quieras mostrar: sin `groups` no hay navegación, sin
 * `contact` no hay columna de contacto, y sin `legal` ni `legalLinks` no hay franja inferior.
 * En pantallas chicas las columnas se apilan. El año y el texto legal los escribes tú, para
 * que el pie no cambie solo entre el servidor y el navegador.
 *
 * **Cuándo usarlo:** una vez por página, en la propiedad `footer` de `Layout`. Usa
 * `tone="deep"` para cerrar la página con un bloque azul noche.
 *
 * @example
 * ```tsx
 * <Footer
 *   description="Software que encaja con tu negocio."
 *   groups={[
 *     { title: 'Servicios', links: [{ label: 'Diagnóstico gratuito', href: '/diagnostico-gratuito' }] },
 *   ]}
 *   contact={<a href="mailto:contacto@pese.cl">contacto@pese.cl</a>}
 *   legal="© PESE. Todos los derechos reservados."
 *   legalLinks={[{ label: 'Privacidad', href: '/privacidad' }]}
 * />
 * ```
 */
export function Footer({
  groups = [],
  description,
  contact,
  contactTitle = 'Contacto',
  legal,
  legalLinks = [],
  tone = 'plain',
  logo,
  homeHref = '/',
  homeLabel = 'PESE, ir al inicio',
  navLabel = 'Pie de página',
  className,
  ...rest
}: FooterProps) {
  const hasBottom = Boolean(legal) || legalLinks.length > 0;
  return (
    <footer {...rest} className={cx('pese-footer', `pese-footer--${tone}`, className)}>
      <Container size="wide" className="pese-footer__inner">
        <div className="pese-footer__top">
          <div className="pese-footer__brand">
            <a className="pese-footer__home" href={homeHref} aria-label={homeLabel}>
              {logo ?? <Logo tone={tone === 'deep' ? 'white' : 'auto'} title={null} />}
            </a>
            {description && <p className="pese-footer__about">{description}</p>}
          </div>

          {groups.length > 0 && (
            <nav className="pese-footer__nav" aria-label={navLabel}>
              {groups.map((group) => (
                <div key={group.title} className="pese-footer__group">
                  <h2 className="pese-footer__title">{group.title}</h2>
                  <ul className="pese-footer__list">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a className="pese-footer__link" href={link.href}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}

          {contact && (
            <div className="pese-footer__contact">
              <h2 className="pese-footer__title">{contactTitle}</h2>
              <div className="pese-footer__contact-body">{contact}</div>
            </div>
          )}
        </div>

        {hasBottom && (
          <div className="pese-footer__bottom">
            {legal && <p className="pese-footer__legal">{legal}</p>}
            {legalLinks.length > 0 && (
              <ul className="pese-footer__legal-links">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a className="pese-footer__link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Container>
    </footer>
  );
}
