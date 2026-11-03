import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, type IconName } from './Icon';

const NAMES: IconName[] = ['conectar', 'inventario', 'facturacion', 'diagnostico', 'soporte'];

const meta = {
  title: 'Marca/Iconos',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'conectar', size: 32 },
  argTypes: { name: { control: 'select', options: NAMES } },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Uno: Story = {};
export const Todos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {NAMES.map((n) => (
        <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Icon name={n} size={32} />
          {n}
        </span>
      ))}
    </div>
  ),
};
