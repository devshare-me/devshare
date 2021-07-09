import { render } from '@redwoodjs/testing'

import Wrapper from './Wrapper'

describe('Wrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Wrapper />)
    }).not.toThrow()
  })
})
