import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ArticleCreateArgs>({
  article: {
    one: {
      title: 'String',
      content: 'String',
      user: { create: { email: 'String1509442', username: 'String6734939' } },
    },
    two: {
      title: 'String',
      content: 'String',
      user: { create: { email: 'String5510036', username: 'String6855698' } },
    },
  },
})

export type StandardScenario = typeof standard
