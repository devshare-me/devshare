const defaultTheme = require('tailwindcss/defaultTheme')
const safelist = import('./src/utils/tailwindSafelist.ts')

module.exports = {
  purge: {
    content: [
      './src/**/*.tsx',
      './src/**/*.ts',
      './src/**/*.jsx',
      './src/**/*.js',
      './src/**/*.css',
    ],
    safelist,
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans],
      mono: ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
