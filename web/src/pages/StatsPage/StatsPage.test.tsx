import { render } from '@redwoodjs/testing'

import StatsPage from './StatsPage'

describe('StatsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StatsPage />)
    }).not.toThrow()
  })
})
