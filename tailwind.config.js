/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
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
        accent: '#8FD1D6',
        graytext: '#C8C8C8',
        whitetext: '#eaeaea',
        pincolor: '#FFA800',
        windowgreen: '#00CA4E',
        windowred: '#FF605C',
        windowyellow: '#FFBD44',
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
          DEFAULT: '#121212',
          light: '#171717',
        },
        react: '#325ea0',
        workflow: '#FFBD44',
        nestjs: '#2E0DF8',
      },
      boxShadow: {
        glass: '36px 36px 60px #212427, -36px -36px 60px #434a4f',
        form: '-5px -5px 20px -1px rgba(68, 68, 68, 0.2), 5px 5px 20px -1px rgba(0, 0, 0, 0.5)',
      },
      typography: {},
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
