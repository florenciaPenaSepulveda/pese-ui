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

export const Nivel0: Story = { args: { level: 0 } };
export const Nivel1: Story = {};
export const Nivel2: Story = { args: { level: 2 } };
export const SinFrase: Story = { args: { label: null } };
