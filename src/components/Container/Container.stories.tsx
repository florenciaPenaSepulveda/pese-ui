import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';
import { Card } from '../Card/Card';

const meta = {
  title: 'Componentes/Contenedor',
  component: Container,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    children: (
      <Card tone="tint">
        Este bloque está dentro del contenedor: se centra y no pasa del ancho máximo.
      </Card>
    ),
  },
  argTypes: { size: { control: 'inline-radio', options: ['narrow', 'default', 'wide'] } },
} satisfies Meta<typeof Container>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Ancho normal (1120 px), el de casi todas las secciones. */
export const Normal: Story = {};
/** 720 px: líneas de lectura cómodas para artículos y formularios. */
export const Estrecho: Story = { args: { size: 'narrow' } };
/** 1280 px: para cuadrículas amplias. */
export const Ancho: Story = { args: { size: 'wide' } };
