import { render } from '@redwoodjs/testing'

import NotificationItem from './NotificationItem'

describe('NotificationItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NotificationItem />)
    }).not.toThrow()
  })
})
