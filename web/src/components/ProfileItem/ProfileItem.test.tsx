import { render } from '@redwoodjs/testing'

import ProfileItem from './ProfileItem'

describe('ProfileItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileItem />)
    }).not.toThrow()
  })
})
