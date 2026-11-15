import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Átomos/Indicador de carga',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
} satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Solo el anillo: el texto «Cargando» lo oyen los lectores de pantalla. */
export const Simple: Story = { parameters: { docs: { source: { code: '<Spinner />' } } } };

export const ConTexto: Story = {
  args: { label: 'Enviando tu mensaje', showLabel: true },
  parameters: { docs: { source: { code: '<Spinner label="Enviando tu mensaje" showLabel />' } } },
};

export const Pequeno: Story = { args: { size: 'sm' }, parameters: { docs: { source: { code: '<Spinner size="sm" />' } } } };
