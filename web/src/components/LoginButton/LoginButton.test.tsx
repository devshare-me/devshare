import { render } from '@redwoodjs/testing'

import LoginButton from './LoginButton'

describe('LoginButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginButton />)
    }).not.toThrow()
  })
})
