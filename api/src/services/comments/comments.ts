import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const comments = ({ postId, parentId }) => {
  return db.comment.findMany()
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
