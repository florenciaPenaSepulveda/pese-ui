import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldError, FieldHint } from './FieldMessage';

const meta = {
  title: 'Átomos/Ayuda y error de campo',
  component: FieldHint,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 460, padding: 24 }}><Story /></div>],
  args: { children: 'Con código de área, por ejemplo 51 2 123456' },
} satisfies Meta<typeof FieldHint>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Texto de apoyo bajo la etiqueta. Los campos de la librería ya lo incluyen. */
export const Ayuda: Story = { parameters: { docs: { source: { code: '<FieldHint id="tel-hint">Con código de área</FieldHint>' } } } };

/** Empieza con la palabra «Error» para no depender solo del color. */
export const Error: Story = {
  render: () => <FieldError id="correo-error">Falta la parte después de la @. Por ejemplo: nombre@empresa.cl</FieldError>,
  parameters: { docs: { source: { code: '<FieldError id="correo-error">Falta la @.</FieldError>' } } },
};
