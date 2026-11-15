import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Moléculas/Migas de pan',
  component: Breadcrumbs,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
  args: { items: [{ label: 'Inicio', href: '/' }, { label: 'Servicios', href: '/servicios' }, { label: 'Diagnóstico' }] },
} satisfies Meta<typeof Breadcrumbs>;
export default meta;
type Story = StoryObj<typeof meta>;

/** La última miga es la página actual: no es un enlace y lleva `aria-current="page"`. */
export const Simple: Story = {
  parameters: {
    docs: { source: { code: "<Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Servicios', href: '/servicios' }, { label: 'Diagnóstico' }]} />" } },
  },
};

export const DosNiveles: Story = { args: { items: [{ label: 'Inicio', href: '/' }, { label: 'Contacto' }] } };

/** Con muchos niveles se acomodan en varias líneas. */
export const Largas: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Automatización de procesos', href: '/blog/automatizacion' },
      { label: 'Cómo ordenar el inventario de un negocio pequeño sin cambiar de sistema' },
    ],
  },
};
