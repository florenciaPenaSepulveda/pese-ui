import type { Meta, StoryObj } from '@storybook/react-vite';
import { LevelIndicator } from './LevelIndicator';

const meta = {
  title: 'Componentes/Indicador de niveles',
  component: LevelIndicator,
  tags: ['autodocs'],
  args: { level: 1 },
  argTypes: { level: { control: 'inline-radio', options: [0, 1, 2] } },
} satisfies Meta<typeof LevelIndicator>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Primer tramo lleno: el cliente está en el diagnóstico. */
export const Nivel0: Story = { args: { level: 0 } };
/** Dos tramos llenos. */
export const Nivel1: Story = {};
/** Los tres tramos llenos. */
export const Nivel2: Story = { args: { level: 2 } };
/** Sin la frase bajo la barra; la barra conserva su descripción accesible. */
export const SinFrase: Story = { args: { label: null } };
