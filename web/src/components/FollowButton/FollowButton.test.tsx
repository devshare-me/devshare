import { render } from '@redwoodjs/testing'

import FollowButton from './FollowButton'

describe('FollowButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FollowButton />)
    }).not.toThrow()
  })
})
