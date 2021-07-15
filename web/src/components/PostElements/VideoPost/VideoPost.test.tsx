import { render } from '@redwoodjs/testing'

import VideoPost from './VideoPost'

describe('VideoPost', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VideoPost />)
    }).not.toThrow()
  })
})
