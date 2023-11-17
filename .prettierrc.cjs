/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: 'avoid',
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: false,
  semi: false,
  trailingComma: 'all',
  tabWidth: 2,

  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],

  // Tailwind
  tailwindAttributes: ['class', 'class:list'],
  tailwindFunctions: ['cn'],

  // Astro
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  astroAllowShorthand: false,
}
