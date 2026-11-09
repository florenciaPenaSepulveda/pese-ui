import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { Link } from '../Link/Link';

const meta = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 520, padding: 24 }}><Story /></div>],
  args: { id: 'recibir', name: 'recibir', label: 'Quiero recibir novedades por correo' },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  parameters: { docs: { source: { code: '<Checkbox id="recibir" name="recibir" label="Quiero recibir novedades por correo" />' } } },
};

export const Marcada: Story = { args: { id: 'recibir-m', defaultChecked: true } };

/** Consentimiento con enlace a la política de privacidad. */
export const Consentimiento: Story = {
  args: {
    id: 'acepto',
    name: 'acepto',
    required: true,
    label: (
      <>
        Acepto que PESE use mis datos para responderme, según la <Link href="/privacidad">política de privacidad</Link>
      </>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: '<Checkbox\n  id="acepto" name="acepto" required\n  label={<>Acepto la <Link href="/privacidad">política de privacidad</Link></>}\n/>',
      },
    },
  },
};

export const ConAyuda: Story = {
  args: { id: 'recibir-a', hint: 'Máximo un correo al mes. Te puedes dar de baja cuando quieras.' },
};

export const ConError: Story = {
  args: { id: 'acepto-e', required: true, error: 'Marca la casilla para poder enviar el formulario.', label: 'Acepto la política de privacidad' },
  parameters: {
    docs: { source: { code: '<Checkbox id="acepto" required label="Acepto la política de privacidad" error="Marca la casilla para poder enviar el formulario." />' } },
  },
};

export const Deshabilitado: Story = { args: { id: 'recibir-d', disabled: true } };
