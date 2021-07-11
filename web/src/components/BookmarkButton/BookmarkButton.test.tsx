import { render } from '@redwoodjs/testing'

import BookmarkButton from './BookmarkButton'

describe('BookmarkButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BookmarkButton />)
    }).not.toThrow()
  })
})
