import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Componentes/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 520, padding: 24 }}><Story /></div>],
  args: { id: 'mensaje', name: 'mensaje', label: 'Mensaje' },
} satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Varias líneas; se estira solo hacia abajo. */
export const Simple: Story = {
  parameters: { docs: { source: { code: '<Textarea id="mensaje" name="mensaje" label="Mensaje" rows={5} />' } } },
};

export const ConAyuda: Story = {
  args: { required: true, hint: 'Cuéntanos qué quieres resolver y cada cuánto te pasa.' },
  parameters: {
    docs: { source: { code: '<Textarea id="mensaje" label="Mensaje" required hint="Cuéntanos qué quieres resolver." />' } },
  },
};

export const ConError: Story = {
  args: { id: 'mensaje-e', required: true, error: 'Escribe un mensaje para poder ayudarte.' },
  parameters: {
    docs: { source: { code: '<Textarea id="mensaje" label="Mensaje" required error="Escribe un mensaje para poder ayudarte." />' } },
  },
};

export const Deshabilitado: Story = { args: { id: 'mensaje-d', disabled: true, defaultValue: 'Bloqueado' } };
