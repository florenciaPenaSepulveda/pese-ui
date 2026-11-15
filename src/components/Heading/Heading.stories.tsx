import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta = {
  title: 'Átomos/Título',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6] },
    size: { control: 'inline-radio', options: ['display', 'xl', 'lg', 'md', 'sm'] },
  },
  decorators: [(Story) => <div style={{ maxWidth: 720, padding: 24, color: 'var(--pese-ink)' }}><Story /></div>],
  args: { level: 2, children: 'Cómo trabajamos' },
} satisfies Meta<typeof Heading>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = { parameters: { docs: { source: { code: '<Heading level={2}>Cómo trabajamos</Heading>' } } } };

/** Cada nivel trae un tamaño por defecto. */
export const TamañosPorNivel: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {([1, 2, 3, 4, 5] as const).map((l) => <Heading key={l} level={l}>Nivel {l}, tamaño por defecto</Heading>)}
    </div>
  ),
  parameters: { docs: { source: { code: '<Heading level={1}>…</Heading>\n<Heading level={2}>…</Heading>\n<Heading level={3}>…</Heading>' } } },
};

/** El nivel ordena la página; el tamaño solo cambia cómo se ve. */
export const NivelYTamañoSeparados: Story = {
  args: { level: 2, size: 'md', children: 'Un título de nivel 2 que se ve más chico' },
  parameters: { docs: { source: { code: '<Heading level={2} size="md">Un título de nivel 2 que se ve más chico</Heading>' } } },
};
