import { filters } from './filters'

const safelist = () => {
  const safelist = []
  const colors = ['gray']
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

  filters.forEach((filter) => {
    if ('color' in filter) {
      colors.push(filter.color)
    }
  })

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

export default safelist
