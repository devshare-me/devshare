import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const recentFeed = async ({ filter }) => {
  const searchQuery = { private: { equals: false } }

  if (filter) searchQuery['type'] = filter

  const posts = await db.post.findMany({
    where: searchQuery,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts
}

export const userFeed = async ({ username, filter }) => {
  const privateCheck = username === context.currentUser?.username ? true : false

  const user = await db.user.findUnique({
    where: { username },
  })

  const searchQuery = { userId: user.id }

  if (filter) searchQuery['type'] = filter

  if (privateCheck) {
    searchQuery['OR'] = [{ private: true }, { private: false }]
  } else {
    searchQuery['private'] = { equals: false }
  }

  const posts = await db.post.findMany({
    where: searchQuery,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts
}
