import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      comment: 'String',
      updatedAt: '2021-07-16T13:43:44Z',
      user: { create: { email: 'String3637773', username: 'String7658022' } },
      post: {
        create: {
          type: 'update',
          updatedAt: '2021-07-16T13:43:44Z',
          user: {
            create: { email: 'String4235188', username: 'String7309620' },
          },
        },
      },
    },
    two: {
      comment: 'String',
      updatedAt: '2021-07-16T13:43:44Z',
      user: { create: { email: 'String9202644', username: 'String1921130' } },
      post: {
        create: {
          type: 'update',
          updatedAt: '2021-07-16T13:43:44Z',
          user: {
            create: { email: 'String8440786', username: 'String7373242' },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
