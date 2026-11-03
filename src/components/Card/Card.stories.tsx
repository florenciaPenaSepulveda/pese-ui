import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = {
  title: 'Componentes/Tarjeta',
  component: Card,
  tags: ['autodocs'],
  args: { children: 'Contenido de la tarjeta' },
  argTypes: { tone: { control: 'inline-radio', options: ['plain', 'tint', 'deep'] } },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {};
export const Suave: Story = { args: { tone: 'tint' } };
export const AzulNoche: Story = { args: { tone: 'deep' } };
export const SinEsquinaGrande: Story = { args: { bigCorner: false } };
