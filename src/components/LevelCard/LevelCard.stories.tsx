import type { Meta, StoryObj } from '@storybook/react-vite';
import { LevelCard } from './LevelCard';

const meta = {
  title: 'Componentes/Tarjeta de nivel',
  component: LevelCard,
  tags: ['autodocs'],
  args: {
    level: 0,
    title: 'Punto de partida',
    description: 'Diagnóstico gratuito y primer paso priorizado.',
    price: 'Gratis',
  },
} satisfies Meta<typeof LevelCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Nivel0: Story = {};
export const Nivel1Destacado: Story = {
  args: {
    level: 1,
    title: 'Primer flujo',
    description: 'Un proceso conectado, con mantención mensual y mejoras.',
    price: '[Precio a definir]',
    featured: true,
  },
};
export const TresNiveles: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
      <LevelCard level={0} title="Punto de partida" description="Diagnóstico gratuito." price="Gratis" />
      <LevelCard level={1} title="Primer flujo" description="Un proceso conectado." price="[Precio a definir]" featured />
      <LevelCard level={2} title="Operación conectada" description="Tus sistemas hablando entre sí." price="[Precio a definir]" />
    </div>
  ),
};
