import { render } from '@redwoodjs/testing'

import FeedItem from './FeedItem'

describe('FeedItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeedItem />)
    }).not.toThrow()
  })
})
