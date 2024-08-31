import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { configs as tsEslintConfigs } from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-config-prettier'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['dist'],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsEslintConfigs,
      prettier,
    },
    extends: [
      js.configs.recommended,
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
    ],
    rules: {
      'prettier/prettier': 'error',
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn'],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]