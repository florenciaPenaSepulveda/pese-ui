import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactForm } from './ContactForm';

const meta = {
  title: 'Organismos/Formulario de contacto',
  component: ContactForm,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 560, padding: 24 }}><Story /></div>],
  args: {
    action: '/api/contacto',
    privacyHref: '/privacidad',
    rubros: [
      { value: 'comercio', label: 'Comercio' },
      { value: 'servicios', label: 'Servicios' },
      { value: 'gastronomia', label: 'Gastronomía' },
      { value: 'otro', label: 'Otro' },
    ],
  },
} satisfies Meta<typeof ContactForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  parameters: { docs: { source: { code: '<ContactForm action="/api/contacto" privacyHref="/privacidad" rubros={[{ value: \'comercio\', label: \'Comercio\' }]} />' } } },
};

/** Tras validar en el servidor: resumen de errores con enlaces a cada campo y el error en cada uno. */
export const ConErrores: Story = {
  args: {
    values: { nombre: 'Florencia', correo: 'florencia@' },
    errors: {
      correo: 'Falta la parte después de la @. Por ejemplo: nombre@empresa.cl',
      mensaje: 'Escribe un mensaje para poder ayudarte.',
      consentimiento: 'Marca la casilla para poder enviar el formulario.',
    },
  },
  parameters: { docs: { source: { code: '<ContactForm action="/api/contacto" privacyHref="/privacidad" values={{ correo: \'florencia@\' }} errors={{ correo: \'Falta la @.\' }} />' } } },
};

export const EnvioExitoso: Story = {
  args: { status: { tone: 'ok', title: 'Mensaje enviado', message: 'Te respondemos en un día hábil.' } },
};

export const EnvioFallido: Story = {
  args: { status: { tone: 'danger', title: 'No pudimos enviar tu mensaje', message: 'Revisa tu conexión e inténtalo de nuevo.' }, values: { nombre: 'Florencia', correo: 'florencia@ejemplo.cl', mensaje: 'Hola' } },
};

/** `loading` deja el botón cargando mientras el servidor responde. */
export const Enviando: Story = { args: { loading: true, submitLabel: 'Enviando…' } };
