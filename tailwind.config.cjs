const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  darkMode: ['class'],
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}
