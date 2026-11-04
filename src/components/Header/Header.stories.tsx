import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const links = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Cómo trabajamos', href: '/como-trabajamos' },
  { label: 'Casos', href: '/casos' },
  { label: 'Blog', href: '/blog' },
];

const meta = {
  title: 'Componentes/Cabecera',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { links, cta: { label: 'Pedir diagnóstico', href: '/diagnostico-gratuito' } },
} satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Logo, enlaces y un botón de acción. En pantallas chicas los enlaces se recogen en el botón «Menú». */
export const Simple: Story = {};

/** `current` marca la página en la que estás: negrita, subrayado y `aria-current="page"`. */
export const PaginaActual: Story = {
  args: { links: links.map((l) => ({ ...l, current: l.href === '/servicios' })) },
};

/** Sin botón de acción. */
export const SinBoton: Story = { args: { cta: undefined } };

/** Un nombre de navegación distinto, útil cuando hay más de una `nav` en la página (cabecera y pie). */
export const ConNombreDeNavegacion: Story = { args: { navLabel: 'Principal', menuLabel: 'Menú' } };
