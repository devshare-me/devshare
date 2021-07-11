import { render } from '@redwoodjs/testing'

import BookmarksPage from './BookmarksPage'

describe('BookmarksPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BookmarksPage />)
    }).not.toThrow()
  })
})
