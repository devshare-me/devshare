import { updates } from './updates'
import type { StandardScenario } from './updates.scenarios'

describe('updates', () => {
  scenario('returns all updates', async (scenario: StandardScenario) => {
    const result = await updates()

    expect(result.length).toEqual(Object.keys(scenario.update).length)
  })
})
