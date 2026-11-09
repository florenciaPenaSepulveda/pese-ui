import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = {
  title: 'Componentes/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: { tone: { control: 'inline-radio', options: ['brand', 'inherit'] } },
  args: { href: '/metodo', children: 'nuestro método' },
} satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Dentro de un párrafo. El subrayado se mantiene: distingue el enlace sin depender del color. */
export const EnUnParrafo: Story = {
  render: (args) => (
    <p style={{ maxWidth: '56ch', fontSize: 18, lineHeight: '27px', color: 'var(--pese-ink)' }}>
      Antes de proponerte nada, entendemos cómo trabajas. Lee más en <Link {...args} /> y decide con calma.
    </p>
  ),
  parameters: {
    docs: { source: { code: '<p>Lee más en <Link href="/metodo">nuestro método</Link>.</p>' } },
  },
};

/** Con `external` abre en pestaña nueva, agrega `rel` seguro y avisa con texto a lectores de pantalla. */
export const Externo: Story = {
  args: { href: 'https://www.sii.cl', children: 'Sitio del SII', external: true },
  parameters: { docs: { source: { code: '<Link href="https://www.sii.cl" external>Sitio del SII</Link>' } } },
};

/** `tone="inherit"` toma el color del texto: es el que se usa sobre azul noche. */
export const SobreAzulNoche: Story = {
  args: { tone: 'inherit' },
  render: (args) => (
    <div className="pese-on-deep" style={{ background: 'var(--pese-deep)', color: 'var(--pese-on-deep)', padding: 32 }}>
      <p style={{ margin: 0, fontSize: 18 }}>
        Lee más en <Link {...args} />.
      </p>
    </div>
  ),
  parameters: { docs: { source: { code: '<Link href="/metodo" tone="inherit">nuestro método</Link>' } } },
};
