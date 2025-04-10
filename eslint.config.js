
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort'; // ✅ Import this
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort, // ✅ Assign the plugin here
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error', // 🔄 Fix: this should be 'exports', not 'simple-import-sort-exports'
    },
  },

  js.configs.recommended, // ✅ You had `pluginJs` instead of `js` here
]);

