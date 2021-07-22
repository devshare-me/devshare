import { render } from '@redwoodjs/testing'

import CommentDialog from './CommentDialog'

describe('CommentDialog', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentDialog />)
    }).not.toThrow()
  })
})
