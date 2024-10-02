import js from '@eslint/js';
import ts from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
  includeIgnoreFile(gitignorePath),

  js.configs.recommended,
  ...ts.configs.strict,
  ...ts.configs.stylistic,

  {
    ...vitest.configs.all,
    files: ['**/*.{test,spec}.{ts,js}'],
    rules: {
      ...vitest.configs.all.rules,
      'vitest/prefer-lowercase-title': ['warn', {
        ignoreTopLevelDescribe: true,
      }],
      'vitest/no-hooks': 'off',
      'vitest/consistent-test-it': ['warn', {
        fn: 'test',
        withinDescribe: 'test',
      }],
      'vitest/prefer-expect-assertions': 'off',
    },
  },

  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    braceStyle: '1tbs',
    commaDangle: {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    },
  }),
];
