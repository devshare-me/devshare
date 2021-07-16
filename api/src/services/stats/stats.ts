import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const stats = async () => {
  return {
    users: {
      total: 2,
      pastWeek: 2,
      pastMonth: 4,
      pastYear: 18,
    },
    posts: {
      total: 21,
      updates: 3,
      snippets: 3,
      articles: 3,
      links: 3,
      images: 3,
      videos: 3,
      shares: 3,
      private: 1,
    },
    comments: 2,
    bookmarks: 1,
  }
}
