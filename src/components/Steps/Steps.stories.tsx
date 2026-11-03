import type { Meta, StoryObj } from '@storybook/react-vite';
import { Steps } from './Steps';

const meta = {
  title: 'Componentes/Pasos',
  component: Steps,
  tags: ['autodocs'],
  args: {
    items: [
      { title: 'Diagnóstico', status: 'done' },
      { title: 'Primer flujo', status: 'current', description: 'Conectamos ventas con inventario.' },
      { title: 'Mejoras mensuales', status: 'todo' },
    ],
  },
} satisfies Meta<typeof Steps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basico: Story = {};
