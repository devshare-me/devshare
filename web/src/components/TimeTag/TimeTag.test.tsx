import { render } from '@redwoodjs/testing'

import TimeTag from './TimeTag'

describe('TimeTag', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TimeTag />)
    }).not.toThrow()
  })
})
