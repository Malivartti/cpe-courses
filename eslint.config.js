const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

const simpleImportSort = {
  plugins: {
    'simple-import-sort': require('eslint-plugin-simple-import-sort'),
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};

module.exports = defineConfig([
  expoConfig,
  prettierRecommended,
  simpleImportSort,
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      '.expo-shared/**',
      'dist/**',
      'build/**',
      'ios/**',
      'android/**',
      'web-build/**',
    ],
  },
]);
