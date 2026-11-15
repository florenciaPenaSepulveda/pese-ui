import type { ImgHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type ImageRatio = 'auto' | '16/9' | '4/3' | '1/1';

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'width' | 'height' | 'src'> & {
  /** Dirección de la imagen. */
  src: string;
  /** Qué muestra la imagen, en una frase. Si solo decora, pasa `decorative` y deja `alt` vacío. */
  alt: string;
  /** Ancho real del archivo en píxeles. Con el alto, evita que la página salte al cargar. */
  width: number;
  /** Alto real del archivo en píxeles. */
  height: number;
  /** Recorta la imagen a una proporción. `auto` respeta la del archivo. */
  ratio?: ImageRatio;
  /** Imagen principal de la página (la primera que se ve): se carga de inmediato en vez de al hacer scroll. */
  priority?: boolean;
  /** Pie de foto. Con él, la imagen va dentro de una `<figure>`. */
  caption?: ReactNode;
};

/**
 * Imagen con tamaño reservado, carga diferida y la esquina grande de la marca.
 *
 * Pide `width` y `height` para que el navegador reserve el espacio. Carga diferida por defecto;
 * si es la primera imagen que se ve, usa `priority`.
 *
 * **Cuándo usarla:** para toda imagen de contenido. El `alt` es obligatorio: descríbela como si la
 * leyeras por teléfono. Si es solo adorno, `alt=""`.
 *
 * @example
 * ```tsx
 * <Image src="/taller.webp" alt="Equipo revisando el inventario" width={1200} height={800} ratio="16/9" />
 * ```
 */
export function Image({ src, alt, width, height, ratio = 'auto', priority, caption, className, ...rest }: ImageProps) {
  const img = (
    <img
      {...rest}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      className={cx('pese-image', ratio !== 'auto' && `pese-image--r-${ratio.replace('/', '-')}`, className)}
    />
  );
  if (!caption) return img;
  return (
    <figure className="pese-figure">
      {img}
      <figcaption className="pese-figure__caption">{caption}</figcaption>
    </figure>
  );
}
