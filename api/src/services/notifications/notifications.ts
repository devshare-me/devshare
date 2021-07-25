import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const notifications = () => {
  if (!context.currentUser.id) return

  const today = new Date()
  const priorDate = new Date().setDate(today.getDate() - 30)

  return db.notification.findMany({
    where: {
      userId: context.currentUser.id,
      createdAt: {
        gte: new Date(priorDate),
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 50,
  })
}

export const readNotification = async ({ id, userId }) => {
  if (context.currentUser.id !== userId) return

  const notification = await db.notification.findUnique({
    where: { id },
  })

  return db.notification.update({
    data: {
      read: true,
      updatedAt: notification.updatedAt,
    },
    where: { id },
  })
}

export const Notification = {
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof notification>>) =>
    db.notification.findUnique({ where: { id: root.id } }).user(),
  post: (_obj, { root }: ResolverArgs<ReturnType<typeof notification>>) =>
    db.notification.findUnique({ where: { id: root.id } }).post(),
  follower: (_obj, { root }: ResolverArgs<ReturnType<typeof notification>>) =>
    db.notification.findUnique({ where: { id: root.id } }).follower(),
}
