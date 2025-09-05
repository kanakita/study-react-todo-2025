import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // TailwindCSSのViteプラグインを追加（修正版）
    try {
      const tailwindcss = await import('@tailwindcss/vite');
      config.plugins?.push(tailwindcss.default());
      return config;
    } catch (error) {
      console.warn('TailwindCSS Vite plugin could not be loaded:', error);
      return config;
    }
  },
};
export default config;
