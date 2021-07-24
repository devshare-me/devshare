import { render } from '@redwoodjs/testing'

import PrivacyPage from './PrivacyPage'

describe('PrivacyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PrivacyPage />)
    }).not.toThrow()
  })
})
