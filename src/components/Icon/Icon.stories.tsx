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

/** Un icono. Sin `label` es decorativo; con `label` se anuncia a lectores de pantalla. */
export const Uno: Story = {};
/** Los cinco iconos disponibles. */
export const Todos: Story = {
  parameters: { docs: { source: { code: `import { Icon } from '@pese-cl/ui';

<Icon name="conectar" size={32} />
<Icon name="inventario" size={32} />
<Icon name="facturacion" size={32} />
<Icon name="diagnostico" size={32} />
<Icon name="soporte" size={32} />` } } },
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
