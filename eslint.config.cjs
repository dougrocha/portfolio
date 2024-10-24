const eslintPluginAstro = require('eslint-plugin-astro')
const typescriptParser = require('@typescript-eslint/parser')

module.exports = [
  ...eslintPluginAstro.configs['flat/recommended'],
  ...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
]
