import type { Meta, StoryObj } from '@storybook/react-vite';
import { LevelsTable } from './LevelsTable';

const meta = {
  title: 'Organismos/Tabla de niveles',
  component: LevelsTable,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 900, padding: 24 }}><Story /></div>],
  args: {
    caption: 'Qué incluye cada nivel (contenido de ejemplo)',
    levels: [
      { name: 'Nivel 1', description: 'Para partir', href: '/niveles/1' },
      { name: 'Nivel 2', description: 'Para ordenar', href: '/niveles/2' },
      { name: 'Nivel 3', description: 'Para escalar', href: '/niveles/3' },
    ],
    rows: [
      { label: 'Conversación inicial', values: [true, true, true] },
      { label: 'Informe de hallazgos', values: [false, true, true] },
      { label: 'Acompañamiento', values: ['Una sesión', 'Mensual', 'Semanal'] },
    ],
  },
} satisfies Meta<typeof LevelsTable>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Los niveles y sus contenidos reales los define el negocio; estos son de ejemplo. */
export const Simple: Story = {
  parameters: {
    docs: {
      source: {
        code: "<LevelsTable\n  caption=\"Qué incluye cada nivel\"\n  levels={[{ name: 'Nivel 1' }, { name: 'Nivel 2' }]}\n  rows={[{ label: 'Conversación inicial', values: [true, true] }, { label: 'Acompañamiento', values: ['Una sesión', 'Mensual'] }]}\n/>",
      },
    },
  },
};
