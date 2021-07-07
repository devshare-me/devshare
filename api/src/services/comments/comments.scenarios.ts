import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      user: { create: { email: 'String4273747', username: 'String5974553' } },
    },
    two: {
      user: { create: { email: 'String2435749', username: 'String6897527' } },
    },
  },
})

export type StandardScenario = typeof standard
