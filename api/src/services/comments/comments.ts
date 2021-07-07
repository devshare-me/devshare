import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const comments = () => {
  return db.comment.findMany()
}

export const Comment = {
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).user(),
  update: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).update(),
  article: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).article(),
  snippet: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).snippet(),
  link: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).link(),
  parent: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).parent(),
  replies: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).replies(),
}
