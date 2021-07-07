import { render } from '@redwoodjs/testing'

import Profile from './Profile'

describe('Profile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Profile />)
    }).not.toThrow()
  })
})
