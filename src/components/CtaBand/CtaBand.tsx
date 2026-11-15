import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Container } from '../Container/Container';
import { Heading } from '../Heading/Heading';

export type CtaBandTone = 'deep' | 'tint';

export type CtaBandProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Frase que invita a la acción. */
  title: ReactNode;
  /** Nivel del título (2 o 3, según dónde caiga en la página). Por defecto 2. */
  titleLevel?: 2 | 3;
  /** deep: azul noche; tint: fondo suave de la marca. */
  tone?: CtaBandTone;
  /** Botones de la banda: uno principal y, a lo más, uno secundario. */
  actions: ReactNode;
  /** Texto de apoyo bajo el título. */
  children?: ReactNode;
};

/**
 * Banda de cierre que invita a dar el siguiente paso, como «Pide tu diagnóstico».
 *
 * **Cuándo usarla:** al final de una página, una vez. Si hay varios llamados a la acción en la misma
 * pantalla, ninguno destaca. Sobre azul noche, usa el botón de acento para la acción principal.
 *
 * @example
 * ```tsx
 * <CtaBand title="Cuéntanos cómo trabajas" actions={<Button href="/contacto" variant="accent" size="lg">Pedir diagnóstico</Button>}>
 *   Revisamos tu caso sin costo y te decimos por dónde empezar.
 * </CtaBand>
 * ```
 */
export function CtaBand({ title, titleLevel = 2, tone = 'deep', actions, className, children, ...rest }: CtaBandProps) {
  return (
    <section {...rest} className={cx('pese-cta', `pese-cta--${tone}`, className)}>
      <Container size="wide" className="pese-cta__inner">
        <div className="pese-cta__content">
          <Heading level={titleLevel} size="xl">
            {title}
          </Heading>
          {children && <div className="pese-cta__text">{children}</div>}
        </div>
        <div className="pese-cta__actions">{actions}</div>
      </Container>
    </section>
  );
}
