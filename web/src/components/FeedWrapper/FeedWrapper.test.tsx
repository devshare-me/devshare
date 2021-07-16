import { render } from '@redwoodjs/testing'

import FeedWrapper from './FeedWrapper'

describe('FeedWrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeedWrapper />)
    }).not.toThrow()
  })
})
