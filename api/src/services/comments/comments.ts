import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const comments = ({ postId, parentId }) => {
  return db.comment.findMany({
    where: { postId },
    orderBy: {
      createdAt: 'asc',
    },
    take: 50,
  })
}

export const comment = ({ id }: Prisma.CommentWhereUniqueInput) => {
  return db.comment.findUnique({
    where: { id },
  })
}

interface CreateCommentArgs {
  input: Prisma.CommentCreateInput
}

export const createComment = async ({ input }: CreateCommentArgs) => {
  const postId = input.postId

  const comment = await db.comment.create({
    data: input,
  })

  // Setup notification
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  })

  // Return comment if user commented on their own post
  if (context?.currentUser?.id === post.userId) return comment

  // Check for current notification
  const currentNotification = await db.notification.findMany({
    where: {
      postId,
      type: 'comment',
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
          connect: { id: post.userId },
        },
        type: 'comment',
        count: 1,
        post: {
          connect: { id: postId },
        },
      },
    })
  }

  return comment
}

interface UpdateCommentArgs extends Prisma.CommentWhereUniqueInput {
  input: Prisma.CommentUpdateInput
}

export const updateComment = ({ id, input }: UpdateCommentArgs) => {
  return db.comment.update({
    data: input,
    where: { id },
  })
}

export const deleteComment = ({ id }: Prisma.CommentWhereUniqueInput) => {
  return db.comment.delete({
    where: { id },
  })
}

export const Comment = {
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).user(),
  post: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).post(),
  parent: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).parent(),
  replies: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).replies(),
}
