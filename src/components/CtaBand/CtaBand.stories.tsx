import type { Meta, StoryObj } from '@storybook/react-vite';
import { CtaBand } from './CtaBand';
import { Button } from '../Button/Button';

const meta = {
  title: 'Organismos/Banda de llamado a la acción',
  component: CtaBand,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { tone: { control: 'inline-radio', options: ['deep', 'tint'] } },
  args: {
    title: 'Cuéntanos cómo trabajas',
    children: 'Revisamos tu caso sin costo y te decimos por dónde empezar.',
    actions: <Button href="/diagnostico-gratuito" variant="accent" size="lg">Pedir diagnóstico</Button>,
  },
} satisfies Meta<typeof CtaBand>;
export default meta;
type Story = StoryObj<typeof meta>;

const code = (tone: string) => `<CtaBand${tone} title="Cuéntanos cómo trabajas" actions={<Button href="/diagnostico-gratuito" variant="accent" size="lg">Pedir diagnóstico</Button>}>\n  Revisamos tu caso sin costo y te decimos por dónde empezar.\n</CtaBand>`;

export const AzulNoche: Story = { parameters: { docs: { source: { code: code('') } } } };
export const Suave: Story = {
  args: { tone: 'tint', actions: <Button href="/diagnostico-gratuito" size="lg">Pedir diagnóstico</Button> },
  parameters: { docs: { source: { code: code(' tone="tint"') } } },
};
export const ConDosAcciones: Story = {
  args: {
    actions: (
      <>
        <Button href="/diagnostico-gratuito" variant="accent" size="lg">Pedir diagnóstico</Button>
        <Button href="/servicios" variant="secondary" size="lg">Ver servicios</Button>
      </>
    ),
  },
};
