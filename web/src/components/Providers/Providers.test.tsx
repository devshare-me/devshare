import { render } from '@redwoodjs/testing'

import Providers from './Providers'

describe('Providers', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Providers />)
    }).not.toThrow()
  })
})
