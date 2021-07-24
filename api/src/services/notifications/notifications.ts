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

  return db.notification.findMany({
    where: {
      userId: context.currentUser.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 50,
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
