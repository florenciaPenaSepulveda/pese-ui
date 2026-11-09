import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const rubros = [
  { value: 'comercio', label: 'Comercio' },
  { value: 'servicios', label: 'Servicios' },
  { value: 'gastronomia', label: 'Gastronomía' },
  { value: 'otro', label: 'Otro' },
];

const meta = {
  title: 'Componentes/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 420, padding: 24 }}><Story /></div>],
  args: { id: 'rubro', name: 'rubro', label: 'Rubro', options: rubros, placeholder: 'Elige una opción' },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

const src = (extra = '') =>
  `<Select\n  id="rubro" name="rubro" label="Rubro" placeholder="Elige una opción"${extra}\n  options={[{ value: 'comercio', label: 'Comercio' }, { value: 'servicios', label: 'Servicios' }]}\n/>`;

export const Simple: Story = { parameters: { docs: { source: { code: src() } } } };

export const Obligatorio: Story = {
  args: { required: true, hint: 'Nos ayuda a preparar el diagnóstico.' },
  parameters: { docs: { source: { code: src('\n  required hint="Nos ayuda a preparar el diagnóstico."') } } },
};

export const ConError: Story = {
  args: { id: 'rubro-e', required: true, error: 'Elige un rubro de la lista.' },
  parameters: { docs: { source: { code: src('\n  required error="Elige un rubro de la lista."') } } },
};

export const ConValorElegido: Story = { args: { id: 'rubro-v', defaultValue: 'servicios' } };

export const Deshabilitado: Story = { args: { id: 'rubro-d', disabled: true } };
