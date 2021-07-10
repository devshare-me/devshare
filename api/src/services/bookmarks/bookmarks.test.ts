import { bookmarks } from './bookmarks'
import type { StandardScenario } from './bookmarks.scenarios'

describe('bookmarks', () => {
  scenario('returns all bookmarks', async (scenario: StandardScenario) => {
    const result = await bookmarks()

    expect(result.length).toEqual(Object.keys(scenario.bookmark).length)
  })
})
