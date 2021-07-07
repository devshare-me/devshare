import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { email: 'String1771573', username: 'String4154782' },
    two: { email: 'String3964761', username: 'String1632337' },
  },
})

export type StandardScenario = typeof standard
