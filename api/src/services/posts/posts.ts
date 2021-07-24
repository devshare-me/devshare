import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

const defaultValues = {
  include: {
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
  take: 50,
}

export const posts = () => {
  return db.post.findMany({
    ...defaultValues,
  })
}

export const post = ({ id }: Prisma.PostWhereUniqueInput) => {
  return db.post.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          shares: true,
          comments: true,
          bookmarkedBy: true,
        },
      },
    },
  })
}

interface CreatePostArgs {
  input: Prisma.PostCreateInput
}

export const createPost = async ({ input }) => {
  input.user = { connect: { id: context.currentUser.id } }

  const sharedPostId = input.sharedPostId

  if (sharedPostId) {
    input.sharedPost = { connect: { id: sharedPostId } }

    // Setup notification
    const sharedPost = await db.post.findUnique({
      where: { id: sharedPostId },
    })

    if (context?.currentUser?.id !== sharedPost.userId) {
      const currentNotification = await db.notification.findMany({
        where: {
          postId: sharedPostId,
          type: 'share',
        },
      })

      if (currentNotification.length > 0) {
        // Update notification
        const element = currentNotification[0]

        await db.notification.update({
          where: {
            id: element.id,
          },
          data: {
            count: element.count + 1,
            read: false,
          },
        })
      } else {
        // New notification
        await db.notification.create({
          data: {
            user: {
              connect: { id: sharedPost.userId },
            },
            type: 'share',
            count: 1,
            post: {
              connect: { id: sharedPostId },
            },
          },
        })
      }
    }

    delete input.sharedPostId
  }

  for (const [key, value] of Object.entries(input)) {
    if (value === '') input[key] = null
  }

  return db.post.create({
    data: input,
  })
}

interface UpdatePostArgs extends Prisma.PostWhereUniqueInput {
  input: Prisma.PostUpdateInput
}

export const updatePost = ({ id, input }: UpdatePostArgs) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost = ({ id }: Prisma.PostWhereUniqueInput) => {
  return db.post.delete({
    where: { id },
  })
}

export const Post = {
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof post>>) =>
    db.post.findUnique({ where: { id: root.id } }).user(),
  sharedPost: (_obj, { root }: ResolverArgs<ReturnType<typeof post>>) =>
    db.post.findUnique({ where: { id: root.id } }).sharedPost(),
  shares: (_obj, { root }: ResolverArgs<ReturnType<typeof post>>) =>
    db.post.findUnique({ where: { id: root.id } }).shares(),
  comments: (_obj, { root }: ResolverArgs<ReturnType<typeof post>>) =>
    db.post.findUnique({ where: { id: root.id } }).comments(),
  bookmarkedBy: (_obj, { root }: ResolverArgs<ReturnType<typeof post>>) =>
    db.post.findUnique({ where: { id: root.id } }).bookmarkedBy(),
}
