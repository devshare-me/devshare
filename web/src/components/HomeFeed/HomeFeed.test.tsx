import { render } from '@redwoodjs/testing'

import HomeFeed from './HomeFeed'

describe('HomeFeed', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomeFeed />)
    }).not.toThrow()
  })
})
