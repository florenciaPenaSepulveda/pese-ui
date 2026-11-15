import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type LevelsTableLevel = {
  /** Nombre del nivel. */
  name: string;
  /** Frase corta bajo el nombre. */
  description?: string;
  /** Enlace a la página del nivel. */
  href?: string;
};

export type LevelsTableRow = {
  /** Qué se compara («Diagnóstico inicial»). */
  label: string;
  /** Un valor por nivel, en el mismo orden: `true` incluido, `false` no incluido, o un texto. */
  values: (string | boolean)[];
};

export type LevelsTableProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Título de la tabla, en una frase («Qué incluye cada nivel»). Se lee antes que el contenido. */
  caption: string;
  /** Niveles a comparar, uno por columna. */
  levels: LevelsTableLevel[];
  /** Filas de la comparación. */
  rows: LevelsTableRow[];
  /** Encabezado de la primera columna. Por defecto «Qué incluye». */
  featureLabel?: string;
};

/**
 * Tabla que compara qué incluye cada nivel de servicio.
 *
 * Es una tabla real: cada celda se lee con su fila y su columna. Lo incluido y lo no incluido se dicen con
 * palabras («Incluido», «No incluido»), no solo con un símbolo. En pantallas chicas se desplaza hacia el
 * lado y se puede recorrer con el teclado.
 *
 * **Cuándo usarla:** en la página de servicios, para decidir entre niveles. Los textos y valores los define
 * el negocio: aquí no hay precios ni contenidos fijos.
 *
 * @example
 * ```tsx
 * <LevelsTable caption="Qué incluye cada nivel"
 *   levels={[{ name: 'Nivel 1' }, { name: 'Nivel 2' }]}
 *   rows={[{ label: 'Diagnóstico inicial', values: [true, true] }, { label: 'Soporte', values: [false, 'Mensual'] }]} />
 * ```
 */
export function LevelsTable({ caption, levels, rows, featureLabel = 'Qué incluye', className, ...rest }: LevelsTableProps) {
  return (
    <div {...rest} className={cx('pese-levels-table', className)} role="region" aria-label={caption} tabIndex={0}>
      <table className="pese-levels-table__table">
        <caption className="pese-levels-table__caption">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className="pese-levels-table__feature-head">
              {featureLabel}
            </th>
            {levels.map((l) => (
              <th key={l.name} scope="col" className="pese-levels-table__head">
                {l.href ? <a href={l.href}>{l.name}</a> : l.name}
                {l.description && <span className="pese-levels-table__desc">{l.description}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row" className="pese-levels-table__feature">
                {r.label}
              </th>
              {r.values.map((v, i) => (
                <td key={`${r.label}-${i}`} className="pese-levels-table__cell">
                  {v === true ? (
                    <span className="pese-levels-table__yes">
                      <span aria-hidden="true">✓ </span>Incluido
                    </span>
                  ) : v === false ? (
                    <span className="pese-levels-table__no">
                      <span aria-hidden="true">— </span>No incluido
                    </span>
                  ) : (
                    v
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
