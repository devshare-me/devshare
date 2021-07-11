import { render } from '@redwoodjs/testing'

import ReportPage from './ReportPage'

describe('ReportPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReportPage />)
    }).not.toThrow()
  })
})
