import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
export type ButtonSize = 'md' | 'lg';

type Common = {
  /** primary: cobalto; secondary: borde; accent: amarillo (uno por pieza); ghost: solo texto. */
  variant?: ButtonVariant;
  /** Ambos tamaños cumplen el objetivo táctil mínimo de 44px. */
  size?: ButtonSize;
  /** Ocupa todo el ancho disponible. */
  fullWidth?: boolean;
  /** Muestra el indicador de carga. El estado lo controla quien usa el componente. */
  loading?: boolean;
  children: ReactNode;
};

type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & { href?: undefined };
type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common> & {
    /** Destino del enlace. Cuando se indica, el botón se pinta como `<a>` en lugar de `<button>`. */
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

function Spinner() {
  return <span className="pese-btn__spinner" aria-hidden="true" />;
}

/**
 * Botón de PESE para las acciones de una página: pedir el diagnóstico, enviar un formulario,
 * ver los niveles.
 *
 * **Cuándo usarlo:** para una acción. Si solo navegas a otra página, pásale `href` y se pinta
 * como enlace `<a>` con el mismo aspecto (mejor para SEO y accesibilidad). Usa **un solo**
 * botón `accent` por pieza para guiar la vista hacia la acción principal.
 *
 * Es un componente sin estado: `loading` y `disabled` los controla quien lo usa.
 *
 * @example
 * ```tsx
 * <Button href="/diagnostico-gratuito" size="lg">Pedir diagnóstico</Button>
 * <Button variant="secondary" type="submit" loading={enviando}>Enviar</Button>
 * ```
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', fullWidth, loading, children, className, ...rest } = props;
  const classes = cx(
    'pese-btn',
    `pese-btn--${variant}`,
    size === 'lg' && 'pese-btn--lg',
    fullWidth && 'pese-btn--block',
    className,
  );
  const content = (
    <>
      {loading ? <Spinner /> : null}
      {children}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, 'aria-disabled': ariaDisabled, ...anchor } = rest as AsLink;
    return (
      <a {...anchor} href={href} className={classes} aria-busy={loading || undefined} aria-disabled={ariaDisabled}>
        {content}
      </a>
    );
  }

  const { type = 'button', disabled, ...button } = rest as AsButton;
  return (
    <button
      {...button}
      type={type}
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}
