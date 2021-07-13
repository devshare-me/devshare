import { render } from '@redwoodjs/testing'

import ProfileLoader from './ProfileLoader'

describe('ProfileLoader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileLoader />)
    }).not.toThrow()
  })
})
