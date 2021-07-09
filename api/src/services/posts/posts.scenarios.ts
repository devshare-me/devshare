import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      type: 'update',
      updatedAt: '2021-07-09T15:37:25Z',
      user: { create: { email: 'String9931178', username: 'String8226411' } },
    },
    two: {
      type: 'update',
      updatedAt: '2021-07-09T15:37:25Z',
      user: { create: { email: 'String4300435', username: 'String9996116' } },
    },
  },
})

export type StandardScenario = typeof standard
