// @ts-check

import tslint from 'typescript-eslint'
import config from '@crcarrick/eslint-config'

export default tslint.config({
  files: ['app/**/*.{ts,tsx}'],
  extends: [...config],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
      project: ['./tsconfig.eslint.json'],
    },
  },
  ignores: ['!**/.*', '**/node_modules', '**/eslint.config.mjs'],
})
