import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleCard } from './ArticleCard';
import { Image } from '../Image/Image';

const cover = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="100%" height="100%" fill="#E7E8FF"/><circle cx="560" cy="180" r="80" fill="#FFD23F"/><rect x="100" y="130" width="240" height="180" fill="#3030DC"/></svg>')}`;

const meta = {
  title: 'Moléculas/Tarjeta de artículo',
  component: ArticleCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 380, padding: 24 }}><Story /></div>],
  args: {
    href: '/blog/ordenar-inventario',
    title: 'Cómo ordenar el inventario de un negocio pequeño',
    category: 'Gestión',
    excerpt: 'Tres pasos para dejar de contar a mano y saber siempre qué tienes (artículo de ejemplo).',
    date: '2026-11-09',
    dateLabel: '9 de noviembre de 2026',
    readingTime: '5 min de lectura',
  },
} satisfies Meta<typeof ArticleCard>;
export default meta;
type Story = StoryObj<typeof meta>;

const code = (image = '') => `<ArticleCard\n  href="/blog/ordenar-inventario"\n  title="Cómo ordenar el inventario"${image}\n  category="Gestión"\n  excerpt="Tres pasos para dejar de contar a mano."\n  date="2026-11-09" dateLabel="9 de noviembre de 2026" readingTime="5 min de lectura"\n/>`;

export const Simple: Story = { parameters: { docs: { source: { code: code() } } } };
export const ConPortada: Story = {
  args: { image: <Image src={cover} alt="" width={800} height={450} ratio="16/9" /> },
  parameters: { docs: { source: { code: code('\n  image={<Image src="/portada.webp" alt="" width={800} height={450} ratio="16/9" />}') } } },
};
export const Minima: Story = { args: { category: undefined, excerpt: undefined, date: undefined, dateLabel: undefined, readingTime: undefined } };
