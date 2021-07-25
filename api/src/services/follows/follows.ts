import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const checkFollow = async ({ userId, followId }) => {
  let follows = false

  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      following: true,
    },
  })

  const result = user.following.filter((follow) => follow.id === followId)

  if (result.length > 0) follows = true

  return follows
}

export const createFollow = async (input) => {
  if (context?.currentUser?.id !== input.userId) return

  const follow = await db.user.update({
    where: { id: input.userId },
    data: {
      following: {
        connect: { id: input.followId },
      },
    },
  })

  const currentNotification = await db.notification.findMany({
    where: {
      followerId: input.userId,
      userId: input.followId,
      type: 'follow',
    },
  })

  if (currentNotification.length === 0) {
    await db.notification.create({
      data: {
        user: {
          connect: { id: input.followId },
        },
        type: 'follow',
        count: 1,
        follower: {
          connect: { id: input.userId },
        },
      },
    })
  }

  return follow
}

export const removeFollow = async (input) => {
  if (context?.currentUser?.id !== input.userId) return

  const currentNotification = await db.notification.findMany({
    where: {
      followerId: input.userId,
      userId: input.followId,
      type: 'follow',
    },
  })

  if (currentNotification.length > 0) {
    await db.notification.deleteMany({
      where: {
        followerId: input.userId,
        userId: input.followId,
        type: 'follow',
      },
    })
  }

  const follow = await db.user.update({
    where: { id: input.userId },
    data: {
      following: {
        disconnect: { id: input.followId },
      },
    },
  })

  return follow
}
