// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const reactYouMightNotNeedAnEffect = require('eslint-plugin-react-you-might-not-need-an-effect');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['node_modules/**', 'dist/**', 'components/**'],
    plugins: {
      'react-you-might-not-need-an-effect': reactYouMightNotNeedAnEffect,
    },
    rules: {
      ...reactYouMightNotNeedAnEffect.configs['legacy-recommended'].rules,
    },
  },
]);
