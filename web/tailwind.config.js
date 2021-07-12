const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans],
      mono: ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
