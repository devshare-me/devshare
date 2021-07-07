import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { email: 'String2873147', username: 'String6577100' },
    two: { email: 'String2334173', username: 'String3426720' },
  },
})

export type StandardScenario = typeof standard
