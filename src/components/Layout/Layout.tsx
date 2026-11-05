import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type LayoutProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Cabecera de la página (por ejemplo, la navegación). Va antes del contenido principal. */
  header?: ReactNode;
  /** Pie de página. Siempre queda al final, aunque el contenido sea corto. */
  footer?: ReactNode;
  /** `id` del contenido principal: es el destino del enlace «Saltar al contenido». */
  mainId?: string;
  children: ReactNode;
};

/**
 * Estructura base de una página: cabecera, contenido principal y pie.
 *
 * Ya incluye la clase `pese-root` (fondo, tipografía y foco de la marca), así que no hace
 * falta envolverla de nuevo. El pie queda abajo aunque haya poco contenido, y el contenido va
 * dentro de un único `<main>` con `id`, listo para un enlace «Saltar al contenido».
 *
 * **Cuándo usarla:** una vez por página, en el layout del sitio. Dentro, ordena cada sección
 * con `Container`.
 *
 * @example
 * ```tsx
 * <Layout header={<MiNavegacion />} footer={<MiPie />}>
 *   <Container>
 *     <h1>Software que encaja con tu negocio</h1>
 *   </Container>
 * </Layout>
 * ```
 */
export function Layout({ header, footer, mainId = 'contenido', className, children, ...rest }: LayoutProps) {
  return (
    <div {...rest} className={cx('pese-root', 'pese-layout', className)}>
      {header}
      <main id={mainId} tabIndex={-1} className="pese-layout__main">
        {children}
      </main>
      {footer}
    </div>
  );
}
