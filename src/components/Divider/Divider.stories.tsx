import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Átomos/Separador',
  component: Divider,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 520, padding: 24, color: 'var(--pese-ink)' }}><p>Antes del separador.</p><Story /><p>Después del separador.</p></div>],
} satisfies Meta<typeof Divider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = { parameters: { docs: { source: { code: '<Divider />' } } } };
export const Marcado: Story = { args: { strong: true }, parameters: { docs: { source: { code: '<Divider strong />' } } } };
