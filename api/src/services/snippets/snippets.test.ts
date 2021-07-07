import { snippets } from './snippets'
import type { StandardScenario } from './snippets.scenarios'

describe('snippets', () => {
  scenario('returns all snippets', async (scenario: StandardScenario) => {
    const result = await snippets()

    expect(result.length).toEqual(Object.keys(scenario.snippet).length)
  })
})
