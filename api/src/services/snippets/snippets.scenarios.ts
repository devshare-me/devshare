import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.SnippetCreateArgs>({
  snippet: {
    one: {
      title: 'String',
      content: 'String',
      user: { create: { email: 'String6655010', username: 'String7835891' } },
    },
    two: {
      title: 'String',
      content: 'String',
      user: { create: { email: 'String5386240', username: 'String6385742' } },
    },
  },
})

export type StandardScenario = typeof standard
