import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout } from './Layout';
import { Container } from '../Container/Container';
import { Card } from '../Card/Card';

const meta = {
  title: 'Componentes/Estructura de página',
  component: Layout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Layout>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Cabecera, contenido y pie. El pie queda abajo aunque el contenido sea corto. */
export const Completa: Story = {
  args: {
    header: <Card tone="deep" bigCorner={false}>Cabecera (aquí va la navegación)</Card>,
    footer: <Card tone="tint" bigCorner={false}>Pie de página</Card>,
    children: (
      <Container>
        <h1 className="pese-text-h1">Software que encaja con tu negocio</h1>
        <p>El contenido va dentro de un único elemento principal, con su identificador.</p>
      </Container>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Layout header={<MiNavegacion />} footer={<MiPie />}>
  <Container>
    <h1 className="pese-text-h1">Software que encaja con tu negocio</h1>
    <p>El contenido va dentro de un único elemento principal, con su identificador.</p>
  </Container>
</Layout>`,
      },
    },
  },
};

/** Sin cabecera ni pie: solo el contenido principal. */
export const SoloContenido: Story = {
  args: {
    children: (
      <Container size="narrow">
        <p>Página sencilla, sin cabecera ni pie.</p>
      </Container>
    ),
  },
};
