import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = {
  title: 'Marca/Logo',
  component: Logo,
  tags: ['autodocs'],
  args: { width: 240 },
  argTypes: {
    variant: { control: 'inline-radio', options: ['logo', 'mark', 'wordmark'] },
    tone: { control: 'inline-radio', options: ['auto', 'ink', 'white'] },
  },
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Isotipo: Story = { args: { variant: 'mark', width: 96 } };
export const SoloNombre: Story = { args: { variant: 'wordmark', width: 200 } };
export const UnaTinta: Story = { args: { tone: 'ink' } };
export const SobreAzulNoche: Story = {
  args: { tone: 'white' },
  render: (args) => (
    <div style={{ background: 'var(--pese-deep)', padding: 32, borderRadius: 12 }}>
      <Logo {...args} />
    </div>
  ),
};
