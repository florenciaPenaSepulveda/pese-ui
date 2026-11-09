import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';

const meta = {
  title: 'Componentes/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['plain', 'deep'] },
    titleAs: { control: 'inline-radio', options: ['h1', 'h2'] },
  },
  args: {
    eyebrow: 'Para negocios de La Serena',
    title: 'Software que encaja con tu negocio',
    children: 'Conectamos tus ventas, tu inventario y tu facturación en un solo lugar, sin cambiar cómo trabajas.',
    actions: (
      <>
        <Button href="/diagnostico-gratuito" size="lg">Pedir diagnóstico</Button>
        <Button href="/servicios" variant="secondary" size="lg">Ver servicios</Button>
      </>
    ),
  },
} satisfies Meta<typeof Hero>;
export default meta;
type Story = StoryObj<typeof meta>;

const code = (tone: string, media: string) => `<Hero
  eyebrow="Para negocios de La Serena"
  title="Software que encaja con tu negocio"${tone}${media}
  actions={
    <>
      <Button href="/diagnostico-gratuito" size="lg"${tone ? ' variant="accent"' : ''}>Pedir diagnóstico</Button>
      <Button href="/servicios" variant="secondary" size="lg">Ver servicios</Button>
    </>
  }
>
  Conectamos tus ventas, tu inventario y tu facturación en un solo lugar, sin cambiar cómo trabajas.
</Hero>`;

/** Sobretítulo, titular, texto y dos botones, sobre el fondo de la página. */
export const Simple: Story = { parameters: { docs: { source: { code: code('', '') } } } };

/** Con `media`: la imagen va al lado en pantalla grande y debajo del texto en pantalla chica. */
export const ConImagen: Story = {
  args: {
    media: (
      <div style={{ background: 'var(--pese-surface-300)', padding: 48, display: 'grid', placeItems: 'center' }}>
        <Logo variant="mark" width={160} aria-hidden="true" />
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: code('', '\n  media={<img src="/ilustracion.svg" alt="Tus ventas, inventario y facturación conectados" />}'),
      },
    },
  },
};

/** Azul noche: la acción principal va en amarillo (acento) y la otra, en secundario. */
export const AzulNoche: Story = {
  args: {
    tone: 'deep',
    actions: (
      <>
        <Button href="/diagnostico-gratuito" variant="accent" size="lg">Pedir diagnóstico</Button>
        <Button href="/servicios" variant="secondary" size="lg">Ver servicios</Button>
      </>
    ),
  },
  parameters: { docs: { source: { code: code('\n  tone="deep"', '') } } },
};

/** Solo lo esencial: titular y un botón. Todo lo demás es opcional. */
export const Minimo: Story = {
  args: {
    eyebrow: undefined,
    children: undefined,
    actions: <Button href="/diagnostico-gratuito" size="lg">Pedir diagnóstico</Button>,
  },
};

/** Si la página ya tiene su `h1`, el titular puede ser un `h2` con el mismo aspecto. */
export const ComoH2: Story = { args: { titleAs: 'h2' } };
