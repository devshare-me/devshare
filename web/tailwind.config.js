const defaultTheme = require('tailwindcss/defaultTheme')

const safelist = () => {
  const safelist = []
  const colors = ['gray', 'indigo', 'yellow', 'blue', 'pink', 'red', 'green']
  const props = [
    { start: 'bg', end: '100' },
    { start: 'hover:bg', end: '100' },
    { start: 'dark:text', end: '100' },
    { start: 'bg', end: '200' },
    { start: 'hover:bg', end: '200' },
    { start: 'dark:text', end: '200' },
    { start: 'dark:hover:text', end: '200' },
    { start: 'hover:bg', end: '300' },
    { start: 'focus:ring', end: '300' },
    { start: 'dark:text', end: '300' },
    { start: 'dark:focus:ring', end: '300' },
    { start: 'bg', end: '500' },
    { start: 'focus:ring', end: '500' },
    { start: 'text', end: '600' },
    { start: 'dark:bg', end: '600' },
    { start: 'text', end: '700' },
    { start: 'border', end: '700' },
    { start: 'dark:hover:bg', end: '700' },
    { start: 'text', end: '800' },
    { start: 'hover:text', end: '800' },
    { start: 'dark:bg', end: '800' },
    { start: 'dark:hover:bg', end: '800' },
    { start: 'text', end: '900' },
    { start: 'dark:bg', end: '900' },
  ]

  for (let p = 0; p < props.length; p++) {
    const prop = props[p]
    for (let c = 0; c < colors.length; c++) {
      const color = colors[c]
      const item = `${prop.start}-${color}-${prop.end}`
      safelist.push(item)
    }
  }

  return safelist
}

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
