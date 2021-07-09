import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { email: 'String2031623', username: 'String3954476' },
    two: { email: 'String4183383', username: 'String3454476' },
  },
})

export type StandardScenario = typeof standard
