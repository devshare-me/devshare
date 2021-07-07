import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UpdateCreateArgs>({
  update: {
    one: {
      content: 'String',
      user: { create: { email: 'String9238735', username: 'String5426357' } },
    },
    two: {
      content: 'String',
      user: { create: { email: 'String8482191', username: 'String3192712' } },
    },
  },
})

export type StandardScenario = typeof standard
