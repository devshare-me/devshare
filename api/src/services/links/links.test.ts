import { links } from './links'
import type { StandardScenario } from './links.scenarios'

describe('links', () => {
  scenario('returns all links', async (scenario: StandardScenario) => {
    const result = await links()

    expect(result.length).toEqual(Object.keys(scenario.link).length)
  })
})
