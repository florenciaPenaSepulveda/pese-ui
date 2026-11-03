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

/** La acción principal de la página. */
export const Primario: Story = {};
/** Acción alternativa, con borde. Va junto al primario. */
export const Secundario: Story = { args: { variant: 'secondary', children: 'Ver niveles' } };
/** Amarillo para la llamada a la acción más importante. Solo uno por pieza. */
export const Acento: Story = { args: { variant: 'accent', children: 'Hablemos' } };
/** Solo texto, para acciones de poco peso («Saber más»). */
export const Texto: Story = { args: { variant: 'ghost', children: 'Saber más' } };
/** Indica que algo se está enviando. El estado `loading` lo controlas tú. */
export const Cargando: Story = { args: { loading: true, children: 'Enviando' } };
/** Sigue legible (7:1) y se distingue por borde y cursor, no solo por color. */
export const Deshabilitado: Story = { args: { disabled: true } };
/** Con `href` se pinta como enlace `<a>` con el mismo aspecto: ideal para navegar entre páginas. */
export const ComoEnlace: Story = { args: { href: '#niveles', children: 'Ver niveles', variant: 'secondary' } };
/** Tamaño grande, para el hero y los cierres de página. */
export const Grande: Story = { args: { size: 'lg' } };

/** Sobre azul noche el foco es claro (on-deep). Pulsa Tab para comprobarlo en ambos temas. */
export const SobreAzulNoche: Story = {
  parameters: { docs: { source: { code: `import { Button, Card } from '@pese-cl/ui';

<Card tone="deep">
  <Button variant="secondary">Ver niveles</Button>
</Card>` } } },
  args: { variant: 'secondary', children: 'Ver niveles' },
  render: (args) => (
    <Card tone="deep">
      <Button {...args} />
    </Card>
  ),
};
