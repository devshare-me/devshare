import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const userFeed = async ({ username, filter }) => {
  let posts

  const user = await db.user.findUnique({
    where: { username },
  })

  if (filter) {
    posts = await db[filter].findMany({
      where: { userId: user.id },
    })
  } else {
    const updates = await db.update.findMany({
      where: { userId: user.id },
    })

    const snippets = await db.snippet.findMany({
      where: { userId: user.id },
    })

    const articles = await db.article.findMany({
      where: { userId: user.id },
    })

    const links = await db.link.findMany({
      where: { userId: user.id },
    })

    posts = updates.concat(snippets, articles, links)
  }

  posts.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  )

  return { posts }
}
