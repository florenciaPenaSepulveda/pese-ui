import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta = {
  title: 'Átomos/Texto',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['lg', 'md', 'sm'] },
    tone: { control: 'inline-radio', options: ['default', 'muted'] },
  },
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
  args: { children: 'Conectamos tus ventas, tu inventario y tu facturación en un solo lugar, sin cambiar cómo trabajas.' },
} satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = { parameters: { docs: { source: { code: '<Text>Conectamos tus ventas…</Text>' } } } };
export const Grande: Story = { args: { size: 'lg', measure: true }, parameters: { docs: { source: { code: '<Text size="lg" measure>Conectamos tus ventas…</Text>' } } } };
export const Pequeño: Story = { args: { size: 'sm', tone: 'muted' }, parameters: { docs: { source: { code: '<Text size="sm" tone="muted">Nota breve.</Text>' } } } };
