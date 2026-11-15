import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notice } from './Notice';

const meta = {
  title: 'Moléculas/Aviso',
  component: Notice,
  tags: ['autodocs'],
  argTypes: { tone: { control: 'inline-radio', options: ['info', 'ok', 'warn', 'danger'] } },
  decorators: [(Story) => <div style={{ maxWidth: 560, padding: 24 }}><Story /></div>],
  args: { children: 'Atendemos de lunes a viernes, de 9:00 a 18:00.' },
} satisfies Meta<typeof Notice>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Informacion: Story = { parameters: { docs: { source: { code: '<Notice>Atendemos de lunes a viernes.</Notice>' } } } };
export const Listo: Story = {
  args: { tone: 'ok', title: 'Mensaje enviado', children: 'Te respondemos en un día hábil.', role: 'status' },
  parameters: { docs: { source: { code: '<Notice tone="ok" title="Mensaje enviado" role="status">Te respondemos en un día hábil.</Notice>' } } },
};
export const Atencion: Story = { args: { tone: 'warn', children: 'Esta semana respondemos con un día de retraso.' } };
export const Error: Story = {
  args: { tone: 'danger', title: 'No pudimos enviar tu mensaje', children: 'Revisa tu conexión e inténtalo de nuevo.', role: 'alert' },
  parameters: { docs: { source: { code: '<Notice tone="danger" title="No pudimos enviar tu mensaje" role="alert">Revisa tu conexión.</Notice>' } } },
};
