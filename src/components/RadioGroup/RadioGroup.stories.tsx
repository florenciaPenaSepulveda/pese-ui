import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const canales = [
  { value: 'correo', label: 'Correo' },
  { value: 'telefono', label: 'Teléfono' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

const meta = {
  title: 'Componentes/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 520, padding: 24 }}><Story /></div>],
  args: { id: 'canal', name: 'canal', legend: '¿Cómo prefieres que te contactemos?', options: canales },
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

const src = (extra = '') =>
  `<RadioGroup\n  id="canal" name="canal" legend="¿Cómo prefieres que te contactemos?"${extra}\n  options={[{ value: 'correo', label: 'Correo' }, { value: 'telefono', label: 'Teléfono' }]}\n/>`;

export const Simple: Story = { parameters: { docs: { source: { code: src() } } } };

export const Obligatorio: Story = {
  args: { required: true, defaultValue: 'correo' },
  parameters: { docs: { source: { code: src('\n  required defaultValue="correo"') } } },
};

/** Cada opción puede llevar una explicación breve. */
export const ConAyudaPorOpcion: Story = {
  args: {
    id: 'nivel',
    name: 'nivel',
    legend: '¿Por dónde quieres empezar?',
    options: [
      { value: 'diagnostico', label: 'Diagnóstico', hint: 'Revisamos cómo trabajas hoy, sin costo.' },
      { value: 'automatizar', label: 'Automatizar un proceso', hint: 'Ya sabes qué quieres resolver.' },
    ],
  },
};

export const ConError: Story = {
  args: { id: 'canal-e', required: true, error: 'Elige cómo prefieres que te contactemos.' },
  parameters: { docs: { source: { code: src('\n  required error="Elige cómo prefieres que te contactemos."') } } },
};

export const OpcionDeshabilitada: Story = {
  args: {
    id: 'canal-d',
    options: [
      { value: 'correo', label: 'Correo' },
      { value: 'telefono', label: 'Teléfono', disabled: true },
    ],
  },
};
