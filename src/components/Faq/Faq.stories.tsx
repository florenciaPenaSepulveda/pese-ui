import type { Meta, StoryObj } from '@storybook/react-vite';
import { Faq } from './Faq';
import { Link } from '../Link/Link';

const meta = {
  title: 'Moléculas/Preguntas frecuentes',
  component: Faq,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 720, padding: 24 }}><Story /></div>],
  args: {
    items: [
      { question: '¿Cómo parte el trabajo?', answer: 'Con una conversación para entender cómo funciona tu negocio hoy. Todavía no hay nada que contratar.' },
      { question: '¿Qué pasa con mis datos?', answer: 'Se usan solo para responderte.' },
      { question: '¿Dónde veo cómo trabajan?', answer: <p>En <Link href="/metodo">nuestro método</Link> está el paso a paso.</p>, answerText: 'En la página del método está el paso a paso.' },
    ],
  },
} satisfies Meta<typeof Faq>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Preguntas de ejemplo. Las reales las define el negocio. */
export const Simple: Story = {
  parameters: { docs: { source: { code: "<Faq items={[{ question: '¿Cómo parte el trabajo?', answer: 'Con una conversación.' }]} />" } } },
};

/** `schema` agrega los datos `FAQPage` para buscadores. */
export const ConDatosParaBuscadores: Story = {
  args: { schema: true },
  parameters: { docs: { source: { code: "<Faq schema items={[{ question: '¿Cómo parte el trabajo?', answer: 'Con una conversación.' }]} />" } } },
};

export const PrimeraAbierta: Story = {
  args: { items: [{ question: '¿Cómo parte el trabajo?', answer: 'Con una conversación.', open: true }, { question: '¿Qué pasa con mis datos?', answer: 'Se usan solo para responderte.' }] },
};
