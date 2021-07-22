import { render } from '@redwoodjs/testing'

import UserPostDetails from './UserPostDetails'

describe('UserPostDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserPostDetails />)
    }).not.toThrow()
  })
})
