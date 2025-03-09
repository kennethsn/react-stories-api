import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    'storybook-addon-deep-controls',
    '@storybook/addon-mdx-gfm'
  ],

  core: {
    disableTelemetry: true,
  },

  docs: {},

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};

export default config;
