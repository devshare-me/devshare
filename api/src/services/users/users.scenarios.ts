import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { email: 'String3406399', username: 'String7589898' },
    two: { email: 'String7395100', username: 'String86730' },
  },
})

export type StandardScenario = typeof standard
