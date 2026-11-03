import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Card } from '../Card/Card';

const meta = {
  title: 'Componentes/Botón',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Pedir diagnóstico' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'accent', 'ghost'] },
    size: { control: 'inline-radio', options: ['md', 'lg'] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primario: Story = {};
export const Secundario: Story = { args: { variant: 'secondary', children: 'Ver niveles' } };
export const Acento: Story = { args: { variant: 'accent', children: 'Hablemos' } };
export const Texto: Story = { args: { variant: 'ghost', children: 'Saber más' } };
export const Cargando: Story = { args: { loading: true, children: 'Enviando' } };
export const Deshabilitado: Story = { args: { disabled: true } };
export const ComoEnlace: Story = { args: { href: '#niveles', children: 'Ver niveles', variant: 'secondary' } };
export const Grande: Story = { args: { size: 'lg' } };

/** Sobre azul noche el foco es claro (on-deep). Pulsa Tab para comprobarlo en ambos temas. */
export const SobreAzulNoche: Story = {
  args: { variant: 'secondary', children: 'Ver niveles' },
  render: (args) => (
    <Card tone="deep">
      <Button {...args} />
    </Card>
  ),
};
