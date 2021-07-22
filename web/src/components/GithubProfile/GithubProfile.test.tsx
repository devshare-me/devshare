import { render } from '@redwoodjs/testing'

import GithubProfile from './GithubProfile'

describe('GithubProfile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GithubProfile />)
    }).not.toThrow()
  })
})
