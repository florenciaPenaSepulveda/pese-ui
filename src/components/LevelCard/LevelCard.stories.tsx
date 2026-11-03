import type { Meta, StoryObj } from '@storybook/react-vite';
import { LevelCard } from './LevelCard';
import { Button } from '../Button/Button';

const meta = {
  title: 'Componentes/Tarjeta de nivel',
  component: LevelCard,
  tags: ['autodocs'],
  args: {
    level: 0,
    title: 'Punto de partida',
    description: 'Diagnóstico gratuito y primer paso priorizado.',
    price: 'Gratis',
  },
} satisfies Meta<typeof LevelCard>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Nivel 0: el diagnóstico gratuito, punto de partida de todo cliente. */
export const Nivel0: Story = {};
/** Una tarjeta destacada (azul noche) para guiar la elección. */
export const Nivel1Destacado: Story = {
  args: {
    level: 1,
    title: 'Primer flujo',
    description: 'Un proceso conectado, con mantención mensual y mejoras.',
    price: '[Precio a definir]',
    featured: true,
  },
};
/** Los tres niveles juntos, con uno destacado. */
export const TresNiveles: Story = {
  parameters: { docs: { source: { code: `import { LevelCard } from '@pese-cl/ui';

<LevelCard level={0} title="Punto de partida" description="Diagnóstico gratuito." price="Gratis" />
<LevelCard level={1} title="Primer flujo" description="Un proceso conectado." price="[Precio a definir]" featured />
<LevelCard level={2} title="Operación conectada" description="Tus sistemas hablando entre sí." price="[Precio a definir]" />` } } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
      <LevelCard level={0} title="Punto de partida" description="Diagnóstico gratuito." price="Gratis" />
      <LevelCard level={1} title="Primer flujo" description="Un proceso conectado." price="[Precio a definir]" featured />
      <LevelCard level={2} title="Operación conectada" description="Tus sistemas hablando entre sí." price="[Precio a definir]" />
    </div>
  ),
};

/** Tarjeta destacada con un enlace y un botón dentro: ambos muestran el foco claro sobre azul noche (pulsa Tab). */
export const DestacadoConEnlaceYBoton: Story = {
  parameters: { docs: { source: { code: `import { Button, LevelCard } from '@pese-cl/ui';

<LevelCard level={1} title="Primer flujo" description="Un proceso conectado." price="[Precio a definir]" featured>
  <p><a href="#detalle">Ver qué incluye</a></p>
  <Button variant="accent" href="#diagnostico">Pedir diagnóstico</Button>
</LevelCard>` } } },
  args: {
    level: 1,
    title: 'Primer flujo',
    description: 'Un proceso conectado, con mantención mensual y mejoras.',
    price: '[Precio a definir]',
    featured: true,
  },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <LevelCard {...args}>
        <p>
          <a href="#detalle" style={{ color: 'inherit' }}>
            Ver qué incluye
          </a>
        </p>
        <Button variant="accent" href="#diagnostico">
          Pedir diagnóstico
        </Button>
      </LevelCard>
    </div>
  ),
};
