import { render } from '@redwoodjs/testing'

import CommentItem from './CommentItem'

describe('CommentItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentItem />)
    }).not.toThrow()
  })
})
