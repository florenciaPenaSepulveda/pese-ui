import type { Meta, StoryObj } from '@storybook/react-vite';
import { Eyebrow } from './Eyebrow';

const meta = {
  title: 'Átomos/Sobretítulo',
  component: Eyebrow,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ padding: 24, color: 'var(--pese-ink-muted)' }}><Story /></div>],
  args: { children: 'Para negocios de La Serena' },
} satisfies Meta<typeof Eyebrow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = { parameters: { docs: { source: { code: '<Eyebrow>Para negocios de La Serena</Eyebrow>' } } } };

/** Hereda el color: sobre azul noche queda claro. */
export const SobreAzulNoche: Story = {
  decorators: [(Story) => <div style={{ background: 'var(--pese-deep)', color: 'var(--pese-on-deep)', padding: 24 }}><Story /></div>],
};
