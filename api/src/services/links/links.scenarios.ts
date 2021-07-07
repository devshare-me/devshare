import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LinkCreateArgs>({
  link: {
    one: {
      url: 'String',
      user: { create: { email: 'String2686689', username: 'String9300045' } },
    },
    two: {
      url: 'String',
      user: { create: { email: 'String6012615', username: 'String8795376' } },
    },
  },
})

export type StandardScenario = typeof standard
