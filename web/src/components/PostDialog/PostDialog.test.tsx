import { render } from '@redwoodjs/testing'

import PostDialog from './PostDialog'

describe('PostDialog', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostDialog />)
    }).not.toThrow()
  })
})
