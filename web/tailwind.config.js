const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: [
      './src/**/*.tsx',
      './src/**/*.ts',
      './src/**/*.jsx',
      './src/**/*.js',
      './src/**/*.css',
    ],
    safelist: [
      'bg-gray-100',
      'bg-indigo-100',
      'bg-yellow-100',
      'bg-blue-100',
      'bg-pink-100',
      'bg-red-100',
      'bg-green-100',
      'hover:bg-gray-100',
      'hover:bg-indigo-100',
      'hover:bg-yellow-100',
      'hover:bg-blue-100',
      'hover:bg-pink-100',
      'hover:bg-red-100',
      'hover:bg-green-100',
      'bg-gray-200',
      'bg-indigo-200',
      'bg-yellow-200',
      'bg-blue-200',
      'bg-pink-200',
      'bg-red-200',
      'bg-green-200',
      'hover:bg-gray-200',
      'hover:bg-indigo-200',
      'hover:bg-yellow-200',
      'hover:bg-blue-200',
      'hover:bg-pink-200',
      'hover:bg-red-200',
      'hover:bg-green-200',
      'hover:bg-gray-300',
      'hover:bg-indigo-300',
      'hover:bg-yellow-300',
      'hover:bg-blue-300',
      'hover:bg-pink-300',
      'hover:bg-red-300',
      'hover:bg-green-300',
      'text-gray-600',
      'text-indigo-600',
      'text-yellow-600',
      'text-blue-600',
      'text-pink-600',
      'text-red-600',
      'text-green-600',
      'text-gray-700',
      'text-indigo-700',
      'text-yellow-700',
      'text-blue-700',
      'text-pink-700',
      'text-red-700',
      'text-green-700',
      'text-gray-800',
      'text-indigo-800',
      'text-yellow-800',
      'text-blue-800',
      'text-pink-800',
      'text-red-800',
      'text-green-800',
      'hover:text-gray-800',
      'hover:text-indigo-800',
      'hover:text-yellow-800',
      'hover:text-blue-800',
      'hover:text-pink-800',
      'hover:text-red-800',
      'hover:text-green-800',
      'text-gray-900',
      'text-indigo-900',
      'text-yellow-900',
      'text-blue-900',
      'text-pink-900',
      'text-red-900',
      'text-green-900',
      'border-gray-700',
      'border-indigo-700',
      'border-yellow-700',
      'border-blue-700',
      'border-pink-700',
      'border-red-700',
      'border-green-700',
      'focus:ring-gray-500',
      'focus:ring-indigo-500',
      'focus:ring-yellow-500',
      'focus:ring-blue-500',
      'focus:ring-pink-500',
      'focus:ring-red-500',
      'focus:ring-green-500',
    ],
  },
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
