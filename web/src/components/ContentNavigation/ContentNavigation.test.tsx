import { render } from '@redwoodjs/testing'

import ContentNavigation from './ContentNavigation'

describe('ContentNavigation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ContentNavigation />)
    }).not.toThrow()
  })
})
