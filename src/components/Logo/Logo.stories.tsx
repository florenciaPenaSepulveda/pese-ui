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

/** Isotipo y nombre en horizontal: para cabecera y pie. */
export const Horizontal: Story = {};
/** Solo el isotipo: para iconos pequeños y redes sociales. */
export const Isotipo: Story = { args: { variant: 'mark', width: 96 } };
/** Solo el nombre, cuando el isotipo ya aparece cerca. */
export const SoloNombre: Story = { args: { variant: 'wordmark', width: 200 } };
/** Una sola tinta, para documentos de un color. */
export const UnaTinta: Story = { args: { tone: 'ink' } };
/** Sobre fondo azul noche usa `tone="white"`. */
export const SobreAzulNoche: Story = {
  parameters: { docs: { source: { code: `import { Logo } from '@pese-cl/ui';

<div style={{ background: '#0E0F2E', padding: 32 }}>
  <Logo tone="white" width={240} />
</div>` } } },
  args: { tone: 'white' },
  render: (args) => (
    <div style={{ background: 'var(--pese-deep)', padding: 32, borderRadius: 12 }}>
      <Logo {...args} />
    </div>
  ),
};
