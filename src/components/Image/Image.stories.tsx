import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './Image';

// Imagen de ejemplo embebida (no es una foto de la marca): un degradado con el tamaño real que se declara.
const sample = (w: number, h: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="#E7E8FF"/><circle cx="${w * 0.7}" cy="${h * 0.4}" r="${h * 0.18}" fill="#FFD23F"/><rect x="${w * 0.1}" y="${h * 0.3}" width="${w * 0.3}" height="${h * 0.4}" fill="#3030DC"/></svg>`,
  )}`;

const meta = {
  title: 'Átomos/Imagen',
  component: Image,
  tags: ['autodocs'],
  argTypes: { ratio: { control: 'inline-radio', options: ['auto', '16/9', '4/3', '1/1'] } },
  decorators: [(Story) => <div style={{ maxWidth: 560, padding: 24 }}><Story /></div>],
  args: { src: sample(1200, 800), alt: 'Ilustración de ejemplo con un círculo amarillo y un bloque azul', width: 1200, height: 800 },
} satisfies Meta<typeof Image>;
export default meta;
type Story = StoryObj<typeof meta>;

const code = (extra = '') =>
  `<Image src="/taller.webp" alt="Equipo revisando el inventario" width={1200} height={800}${extra} />`;

export const Simple: Story = { parameters: { docs: { source: { code: code() } } } };
export const Proporcion16por9: Story = { args: { ratio: '16/9' }, parameters: { docs: { source: { code: code(' ratio="16/9"') } } } };
export const Cuadrada: Story = { args: { ratio: '1/1' }, parameters: { docs: { source: { code: code(' ratio="1/1"') } } } };
export const ConPieDeFoto: Story = {
  args: { caption: 'Revisión de inventario en un local de La Serena (imagen de ejemplo).' },
  parameters: { docs: { source: { code: code(' caption="Revisión de inventario en un local."') } } },
};
export const Decorativa: Story = { args: { alt: '' }, parameters: { docs: { source: { code: '<Image src="/adorno.svg" alt="" width={600} height={400} />' } } } };
