/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          white: '#FFFDFA',
          brightgray: '#eaeaea',
          silver: '#c8c8c8',
        },
        secondary: {
          yellow: '#FFBD44',
          red: '#FF605C',
          orange: '#FFA800',
          green: '#00CA4E',
        },
        accent: '#8FD1D6',
        onyx: {
          100: '#d6d7d8',
          200: '#adafb1',
          300: '#848789',
          400: '#5b5f62',
          DEFAULT: '#32373b',
          600: '#282c2f',
          700: '#1e2123',
          800: '#141618',
          900: '#0a0b0c',
        },
        feldgray: {
          100: '#dbdede',
          200: '#b7bcbd',
          300: '#929b9b',
          400: '#6e797a',
          DEFAULT: '#4a5859',
          600: '#3b4647',
          700: '#2c3535',
          800: '#1e2324',
          900: '#0f1212',
        },
        bg: {
          100: '#d1d1d1',
          200: '#a2a2a2',
          300: '#747474',
          400: '#454545',
          500: '#171717',
          600: '#121212',
          700: '#0e0e0e',
          800: '#090909',
          900: '#050505',
        },
        react: '#325ea0',
        nestjs: '#2E0DF8',
      },
      boxShadow: {
        glass: '36px 36px 60px #212427, -36px -36px 60px #434a4f',
        form: '-5px -5px 20px -1px rgba(68, 68, 68, 0.2), 5px 5px 20px -1px rgba(0, 0, 0, 0.5)',
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-invert-body': theme('colors.gray[200]'),
            '--tw-prose-invert-headings': theme('colors.gray'),
            '--tw-prose-invert-lead': theme('colors.gray[300]'),
            '--tw-prose-invert-links': theme('colors.gray'),
            '--tw-prose-invert-bold': theme('colors.gray'),
            '--tw-prose-invert-counters': theme('colors.gray[400]'),
            '--tw-prose-invert-bullets': theme('colors.gray[600]'),
            '--tw-prose-invert-hr': theme('colors.gray[700]'),
            '--tw-prose-invert-quotes': theme('colors.gray[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.gray[700]'),
            '--tw-prose-invert-captions': theme('colors.gray[400]'),
            '--tw-prose-invert-code': theme('colors.gray'),
            '--tw-prose-invert-pre-code': theme('colors.gray[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.gray[600]'),
            '--tw-prose-invert-td-borders': theme('colors.gray[700]'),
          },
        },
      }),
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
