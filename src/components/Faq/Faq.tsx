import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { JsonLd, faqPageJsonLd } from '../../seo/JsonLd';

export type FaqItem = {
  /** Pregunta, escrita como la haría quien la tiene. */
  question: string;
  /** Respuesta visible. Puede incluir enlaces y párrafos. */
  answer: ReactNode;
  /** Respuesta en texto plano para buscadores. Si `answer` ya es un texto, no hace falta. */
  answerText?: string;
  /** Abre esta pregunta al cargar la página. */
  open?: boolean;
};

export type FaqProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Preguntas y respuestas, en el orden en que se leen. */
  items: FaqItem[];
  /** Agrega los datos `FAQPage` para buscadores. Úsalo solo si las respuestas visibles son las mismas. */
  schema?: boolean;
};

/**
 * Preguntas frecuentes que se abren y cierran sin JavaScript (`<details>` y `<summary>`).
 *
 * Funciona con teclado y lectores de pantalla, y el texto de las respuestas queda en el HTML para
 * buscadores. Con `schema` agrega también los datos estructurados `FAQPage`.
 *
 * **Cuándo usarlo:** para dudas reales de quien contrata (plazos, qué incluye, cómo se paga). Si la
 * respuesta es larga o necesita imágenes, mejor una página propia.
 *
 * @example
 * ```tsx
 * <Faq schema items={[{ question: '¿Cuánto demora el diagnóstico?', answer: 'Una semana.' }]} />
 * ```
 */
export function Faq({ items, schema, className, ...rest }: FaqProps) {
  const schemaItems = schema
    ? items.flatMap((it) => {
        const text = it.answerText ?? (typeof it.answer === 'string' ? it.answer : undefined);
        return text ? [{ question: it.question, answer: text }] : [];
      })
    : [];
  return (
    <div {...rest} className={cx('pese-faq', className)}>
      {items.map((it, i) => (
        <details key={`${it.question}-${i}`} className="pese-faq__item" open={it.open || undefined}>
          <summary className="pese-faq__question">{it.question}</summary>
          <div className="pese-faq__answer">{it.answer}</div>
        </details>
      ))}
      {schemaItems.length > 0 && <JsonLd data={faqPageJsonLd(schemaItems)} />}
    </div>
  );
}
