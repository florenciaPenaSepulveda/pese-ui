import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  // Sirve dist/ para que /fonts.css y /fonts/*.woff2 salgan del propio repo (npm run build:fonts las genera).
  staticDirs: ['../dist'],
  framework: { name: '@storybook/react-vite', options: {} },
};

export default config;
