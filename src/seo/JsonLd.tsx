/** Un dato para buscadores en formato JSON-LD (schema.org). */
export type JsonLdData = Record<string, unknown>;

export type JsonLdProps = {
  /** Objeto schema.org, por ejemplo el que devuelve `faqPageJsonLd` o `breadcrumbListJsonLd`. */
  data: JsonLdData;
};

/**
 * Inserta datos estructurados (JSON-LD) para que Google entienda la página: preguntas frecuentes,
 * migas de pan, etc. No dibuja nada: solo agrega un `<script type="application/ld+json">`.
 *
 * Escapa el carácter `<` para que un texto no pueda cerrar el script antes de tiempo.
 *
 * @example
 * ```tsx
 * <JsonLd data={faqPageJsonLd([{ question: '¿Cuánto dura?', answer: 'Una semana.' }])} />
 * ```
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export type FaqSchemaItem = {
  /** Pregunta, tal como se lee en la página. */
  question: string;
  /** Respuesta en texto (sin etiquetas HTML ni componentes). */
  answer: string;
};

/** Datos `FAQPage` de schema.org. Las respuestas deben ser las mismas que se ven en la página. */
export function faqPageJsonLd(items: FaqSchemaItem[]): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

export type BreadcrumbSchemaItem = {
  /** Nombre de la miga. */
  name: string;
  /** Dirección completa, con https:// (los buscadores la piden absoluta). */
  url: string;
};

/** Datos `BreadcrumbList` de schema.org, en el mismo orden que las migas visibles. */
export function breadcrumbListJsonLd(items: BreadcrumbSchemaItem[]): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
