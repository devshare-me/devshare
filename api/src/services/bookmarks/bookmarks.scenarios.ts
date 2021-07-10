import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.BookmarkCreateArgs>({
  bookmark: {
    one: {
      post: {
        create: {
          type: 'update',
          updatedAt: '2021-07-10T15:15:04Z',
          user: {
            create: { email: 'String5542557', username: 'String5461126' },
          },
        },
      },
      user: { create: { email: 'String5479626', username: 'String8265464' } },
    },
    two: {
      post: {
        create: {
          type: 'update',
          updatedAt: '2021-07-10T15:15:04Z',
          user: {
            create: { email: 'String5625894', username: 'String9568808' },
          },
        },
      },
      user: { create: { email: 'String3452630', username: 'String2396443' } },
    },
  },
})

export type StandardScenario = typeof standard
