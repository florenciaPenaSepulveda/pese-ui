import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta = {
  title: 'Moléculas/Paginación',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
  args: { current: 4, total: 12, hrefTemplate: '/blog?pagina={page}' },
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;

export const EnElMedio: Story = { parameters: { docs: { source: { code: '<Pagination current={4} total={12} hrefTemplate="/blog?pagina={page}" />' } } } };
export const PrimeraPagina: Story = { args: { current: 1 } };
export const UltimaPagina: Story = { args: { current: 12 } };
export const PocasPaginas: Story = { args: { current: 2, total: 3 } };
