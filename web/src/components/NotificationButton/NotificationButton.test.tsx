import { render } from '@redwoodjs/testing'

import NotificationButton from './NotificationButton'

describe('NotificationButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NotificationButton />)
    }).not.toThrow()
  })
})
