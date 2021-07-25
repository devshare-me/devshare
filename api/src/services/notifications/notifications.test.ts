import { notifications } from './notifications'
import type { StandardScenario } from './notifications.scenarios'

describe('notifications', () => {
  scenario('returns all notifications', async (scenario: StandardScenario) => {
    const result = await notifications()

    expect(result.length).toEqual(Object.keys(scenario.notification).length)
  })
})
