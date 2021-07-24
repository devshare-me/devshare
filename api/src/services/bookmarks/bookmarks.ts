import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const bookmarks = async () => {
  return db.post.findMany({
    where: {
      bookmarkedBy: {
        some: {
          userId: {
            in: [context.currentUser.id],
          },
        },
      },
    },
    include: {
      bookmarkedBy: {
        where: {
          userId: context.currentUser.id,
        },
      },
      sharedPost: true,
      _count: {
        select: {
          shares: true,
          comments: true,
          bookmarkedBy: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  })
}

export const createBookmark = ({ postId }) => {
  return db.bookmark.create({
    data: {
      user: {
        connect: {
          id: context.currentUser.id,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
  })
}

export const deleteBookmark = ({ postId }) => {
  return db.bookmark.delete({
    where: {
      postId_userId: {
        postId: postId,
        userId: context.currentUser.id,
      },
    },
  })
}

export const Bookmark = {
  post: (_obj, { root }: ResolverArgs<ReturnType<typeof bookmark>>) =>
    db.bookmark
      .findUnique({
        where: {
          postId_userId: {
            postId: root.postId,
            userId: context.currentUser.id,
          },
        },
      })
      .post(),
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof bookmark>>) =>
    db.bookmark
      .findUnique({
        where: {
          postId_userId: {
            postId: root.postId,
            userId: context.currentUser.id,
          },
        },
      })
      .user(),
}
