import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.NotificationCreateArgs>({
  notification: {
    one: {
      type: 'follow',
      count: 1449741,
      updatedAt: '2021-07-24T21:12:42Z',
      user: { create: { email: 'String1756177', username: 'String3912790' } },
    },
    two: {
      type: 'follow',
      count: 3994690,
      updatedAt: '2021-07-24T21:12:42Z',
      user: { create: { email: 'String4113005', username: 'String8365618' } },
    },
  },
})

export type StandardScenario = typeof standard
