import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Componentes/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'tel', 'url', 'search', 'password', 'number'] },
  },
  decorators: [(Story) => <div style={{ maxWidth: 420, padding: 24 }}><Story /></div>],
  args: { id: 'nombre', name: 'nombre', label: 'Nombre', autoComplete: 'name' },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Etiqueta siempre visible sobre el campo. */
export const Simple: Story = {
  parameters: {
    docs: { source: { code: '<Input id="nombre" name="nombre" label="Nombre" autoComplete="name" />' } },
  },
};

/** `required` agrega «(obligatorio)» a la etiqueta y el atributo al campo. */
export const Obligatorio: Story = {
  args: { id: 'correo', name: 'correo', type: 'email', label: 'Correo', required: true, autoComplete: 'email' },
  parameters: {
    docs: {
      source: {
        code: '<Input id="correo" name="correo" type="email" label="Correo" required autoComplete="email" />',
      },
    },
  },
};

/** Ayuda breve entre la etiqueta y el campo; queda conectada con `aria-describedby`. */
export const ConAyuda: Story = {
  args: { id: 'tel', name: 'tel', type: 'tel', label: 'Teléfono', hint: 'Con código de área, por ejemplo 51 2 123456', optional: true, autoComplete: 'tel' },
  parameters: {
    docs: {
      source: {
        code: '<Input id="tel" name="tel" type="tel" label="Teléfono" hint="Con código de área" optional />',
      },
    },
  },
};

/** El error empieza con la palabra «Error» y dice cómo corregirlo. El campo queda con `aria-invalid`. */
export const ConError: Story = {
  args: { id: 'correo-e', name: 'correo', type: 'email', label: 'Correo', required: true, defaultValue: 'florencia@', error: 'Falta la parte después de la @. Por ejemplo: nombre@empresa.cl' },
  parameters: {
    docs: {
      source: {
        code: '<Input id="correo" type="email" label="Correo" required error="Falta la parte después de la @." />',
      },
    },
  },
};

export const Deshabilitado: Story = { args: { disabled: true, defaultValue: 'Bloqueado' } };

/** Un mini formulario para ver el ritmo vertical entre campos. */
export const EnUnFormulario: Story = {
  render: () => (
    <form style={{ display: 'grid', gap: 24 }}>
      <Input id="f-nombre" name="nombre" label="Nombre" required autoComplete="name" />
      <Input id="f-correo" name="correo" type="email" label="Correo" required autoComplete="email" />
      <Input id="f-tel" name="tel" type="tel" label="Teléfono" hint="Con código de área" optional autoComplete="tel" />
    </form>
  ),
  parameters: { docs: { source: { code: '<Input id="nombre" label="Nombre" required />\n<Input id="correo" type="email" label="Correo" required />\n<Input id="tel" type="tel" label="Teléfono" optional />' } } },
};
