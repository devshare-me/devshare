import { render } from '@redwoodjs/testing'

import PostLoader from './PostLoader'

describe('PostLoader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostLoader />)
    }).not.toThrow()
  })
})
