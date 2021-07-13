import { render } from '@redwoodjs/testing'

import SearchForm from './SearchForm'

describe('SearchForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchForm />)
    }).not.toThrow()
  })
})
