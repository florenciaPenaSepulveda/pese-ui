import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const groups = [
  {
    title: 'Servicios',
    links: [
      { label: 'Diagnóstico gratuito', href: '/diagnostico-gratuito' },
      { label: 'Automatización de procesos', href: '/servicios' },
      { label: 'Cómo trabajamos', href: '/como-trabajamos' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Casos', href: '/casos' },
      { label: 'Blog', href: '/blog' },
    ],
  },
];

const meta = {
  title: 'Componentes/Pie de página',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { tone: { control: 'inline-radio', options: ['plain', 'deep'] } },
  args: {
    description: 'Software que encaja con tu negocio.',
    groups,
    contact: (
      <>
        <a href="mailto:contacto@pese.cl">contacto@pese.cl</a>
        <p>La Serena, Chile</p>
      </>
    ),
    legal: '© PESE. Todos los derechos reservados.',
    legalLinks: [
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Términos', href: '/terminos' },
    ],
  },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Logo y lema, dos columnas de enlaces, contacto y franja legal, sobre el fondo de la página. */
export const Simple: Story = {};

/** `tone="deep"` cierra la página con un bloque azul noche; el logo pasa a blanco solo. */
export const AzulNoche: Story = { args: { tone: 'deep' } };

/** Solo lo esencial: sin columnas de enlaces ni contacto. Cada parte es opcional. */
export const Minimo: Story = {
  args: { groups: undefined, contact: undefined, legalLinks: undefined },
};

/** Con otro nombre de navegación, útil si la página tiene más de una `nav`. */
export const ConNombreDeNavegacion: Story = { args: { navLabel: 'Enlaces del sitio' } };
