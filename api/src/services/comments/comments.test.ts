import { comments } from './comments'
import type { StandardScenario } from './comments.scenarios'

describe('comments', () => {
  scenario('returns all comments', async (scenario: StandardScenario) => {
    const result = await comments()

    expect(result.length).toEqual(Object.keys(scenario.comment).length)
  })
})
