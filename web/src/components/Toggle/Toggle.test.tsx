import { render } from '@redwoodjs/testing'

import Toggle from './Toggle'

describe('Toggle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Toggle />)
    }).not.toThrow()
  })
})
