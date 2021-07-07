import { articles } from './articles'
import type { StandardScenario } from './articles.scenarios'

describe('articles', () => {
  scenario('returns all articles', async (scenario: StandardScenario) => {
    const result = await articles()

    expect(result.length).toEqual(Object.keys(scenario.article).length)
  })
})
