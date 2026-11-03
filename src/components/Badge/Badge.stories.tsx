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

/** Etiqueta neutra: el tono por defecto, para rotular sin llamar la atención. */
export const Neutral: Story = {};
/** Tono de marca (cobalto): para clasificar, por ejemplo con el nivel de servicio. */
export const Marca: Story = { args: { tone: 'brand', children: 'Nivel 1' } };
/** Tono de acento (amarillo): lo que debe verse primero. Úsalo una vez por pieza. */
export const Acento: Story = { args: { tone: 'accent', children: 'Nuevo' } };
/** `Status` dice el estado con icono **y** palabra; nunca solo con color. */
export const Estados: Story = {
  parameters: { docs: { source: { code: `import { Status } from '@pese-cl/ui';

<Status tone="ok" label="Conectado" />
<Status tone="warn" label="Pendiente" />
<Status tone="danger" label="Con error" />` } } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Status tone="ok" label="Conectado" />
      <Status tone="warn" label="Pendiente" />
      <Status tone="danger" label="Con error" />
    </div>
  ),
};
