import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      comment: 'String',
      updatedAt: '2021-07-09T15:38:07Z',
      user: { create: { email: 'String9061669', username: 'String505641' } },
      post: {
        create: {
          type: 'update',
          updatedAt: '2021-07-09T15:38:07Z',
          user: {
            create: { email: 'String1571952', username: 'String4010126' },
          },
        },
      },
    },
    two: {
      comment: 'String',
      updatedAt: '2021-07-09T15:38:07Z',
      user: { create: { email: 'String8126608', username: 'String4193991' } },
      post: {
        create: {
          type: 'update',
          updatedAt: '2021-07-09T15:38:07Z',
          user: {
            create: { email: 'String2807395', username: 'String3601158' },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
