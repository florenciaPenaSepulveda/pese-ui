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

/** Superficie con borde: el contenedor por defecto. */
export const Simple: Story = {};
/** Bloque suave, sin borde, para separar secciones. */
export const Suave: Story = { args: { tone: 'tint' } };
/** Fondo azul noche con texto claro, para resaltar un bloque. */
export const AzulNoche: Story = { args: { tone: 'deep' } };
/** Sin la esquina superior izquierda grande de la marca. */
export const SinEsquinaGrande: Story = { args: { bigCorner: false } };
