import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta = {
  title: 'Componentes/Label',
  component: Label,
  tags: ['autodocs'],
  args: { htmlFor: 'correo', children: 'Correo' },
} satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Etiqueta sola. Normalmente no se usa suelta: `Input` ya la incluye. */
export const Simple: Story = {};

/** Dice «obligatorio» con palabras, no solo con un asterisco. */
export const Obligatorio: Story = {
  args: { required: true },
  parameters: { docs: { source: { code: '<Label htmlFor="correo" required>Correo</Label>' } } },
};

/** Si casi todo es obligatorio, marca solo lo opcional. */
export const Opcional: Story = {
  args: { htmlFor: 'tel', optional: true, children: 'Teléfono' },
  parameters: { docs: { source: { code: '<Label htmlFor="tel" optional>Teléfono</Label>' } } },
};
