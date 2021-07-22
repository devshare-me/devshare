import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'

function dateAgo(offset) {
  const today = new Date()
  const priorDate = new Date().setDate(today.getDate() - 30)

  return new Date(priorDate)
}

export const stats = async () => {
  const weekAgo = dateAgo(7)
  const monthAgo = dateAgo(30)
  const yearAgo = dateAgo(365)

  const users = {}
  const posts = {}

  const allUsers = db.user.count()
  const weekUsers = db.user.count({
    where: {
      createdAt: {
        gte: weekAgo,
      },
    },
  })
  const monthUsers = db.user.count({
    where: {
      createdAt: {
        gte: monthAgo,
      },
    },
  })
  const yearUsers = db.user.count({
    where: {
      createdAt: {
        gte: yearAgo,
      },
    },
  })

  users['total'] = allUsers
  users['pastWeek'] = weekUsers
  users['pastMonth'] = monthUsers
  users['pastYear'] = yearUsers

  const allPosts = await db.post.count()

  const updates = await db.post.count({
    where: { type: 'update' },
  })

  const snippets = await db.post.count({
    where: { type: 'snippet' },
  })

  const articles = await db.post.count({
    where: { type: 'article' },
  })

  const links = await db.post.count({
    where: { type: 'link' },
  })

  const images = await db.post.count({
    where: { type: 'image' },
  })

  const videos = await db.post.count({
    where: { type: 'video' },
  })

  const shares = await db.post.count({
    where: { type: 'share' },
  })

  const privatePosts = await db.post.count({
    where: { private: true },
  })

  posts['total'] = allPosts
  posts['updates'] = updates
  posts['snippets'] = snippets
  posts['articles'] = articles
  posts['links'] = links
  posts['images'] = images
  posts['videos'] = videos
  posts['shares'] = shares
  posts['private'] = privatePosts

  const comments = await db.comment.count()
  const bookmarks = await db.bookmark.count()

  return {
    users,
    posts,
    comments,
    bookmarks,
  }
}
