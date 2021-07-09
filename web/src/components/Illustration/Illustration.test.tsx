import { render } from '@redwoodjs/testing'

import Illustration from './Illustration'

describe('Illustration', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Illustration />)
    }).not.toThrow()
  })
})
