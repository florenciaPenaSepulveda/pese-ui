import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Status } from './Badge';

const meta = {
  title: 'Componentes/Etiqueta y estado',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Nuevo' },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Marca: Story = { args: { tone: 'brand', children: 'Nivel 1' } };
export const Acento: Story = { args: { tone: 'accent', children: 'Nuevo' } };
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Status tone="ok" label="Conectado" />
      <Status tone="warn" label="Pendiente" />
      <Status tone="danger" label="Con error" />
    </div>
  ),
};
