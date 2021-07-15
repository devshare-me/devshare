import { render } from '@redwoodjs/testing'

import ImagePost from './ImagePost'

describe('ImagePost', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImagePost />)
    }).not.toThrow()
  })
})
