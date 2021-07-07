import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const snippets = () => {
  return db.snippet.findMany()
}

export const Snippet = {
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof snippet>>) =>
    db.snippet.findUnique({ where: { id: root.id } }).user(),
  comments: (_obj, { root }: ResolverArgs<ReturnType<typeof snippet>>) =>
    db.snippet.findUnique({ where: { id: root.id } }).comments(),
}
