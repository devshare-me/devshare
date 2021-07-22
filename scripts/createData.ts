// To access your database
import { db } from '../api/src/lib/db'
import cuid from 'cuid'
import faker from 'faker'
import randomUrlGen from 'random-youtube-music-video'

export default async ({ args }) => {
  const { log, userId } = args

  const users = !userId ? createUsers() : [{ id: userId }]
  const follows = !userId ? createFollows(users) : []
  const posts = await createPosts(users)
  const bookmarks = createBookmarks(users, posts)
  const comments = createComments(posts, users)

  // USERS
  if (!log && !userId) {
    const newUsers = await db.user.createMany({
      data: users,
      skipDuplicates: true,
    })

    console.log(`${newUsers.count} users created`)
  } else {
    console.log('Users:', users)
  }

  // FOLLOWS
  if (!log) {
    let newFollows = 0

    for (let i = 0; i < follows.length; i++) {
      const follow = follows[i]

      const newFollow = await db.user.update({
        where: { id: follow.userId },
        data: {
          following: {
            connect: { id: follow.followId },
          },
        },
      })

      if (newFollow) newFollows++
    }

    console.log(`${newFollows} follows created`)
  } else {
    console.log('Follows:', follows)
  }

  // POSTS
  if (!log) {
    const newPosts = await db.post.createMany({
      data: posts,
      skipDuplicates: true,
    })

    console.log(`${newPosts.count} posts created`)
  } else {
    console.log('Posts:', posts)
  }

  // BOOKMARKS
  if (!log) {
    let newBookmarks = 0

    for (let i = 0; i < bookmarks.length; i++) {
      const bookmark = bookmarks[i]

      const newBookmark = await db.bookmark.create({
        data: {
          user: {
            connect: {
              id: bookmark.userId,
            },
          },
          post: {
            connect: {
              id: bookmark.postId,
            },
          },
        },
      })

      if (newBookmark) newBookmarks++
    }

    console.log(`${newBookmarks} bookmarks created`)
  } else {
    console.log('Bookmarks:', bookmarks)
  }

  // COMMENTS
  if (!log) {
    const newComments = await db.comment.createMany({
      data: comments,
      skipDuplicates: true,
    })

    console.log(`${newComments.count} comments created`)
  } else {
    console.log('Comments:', comments)
  }
}

const createUsers = () => {
  const users = []

  for (let i = 0; i < 10; i++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const username = `${firstName}-${lastName}`.toLowerCase()

    users.push({
      id: cuid(),
      email: faker.internet.email(),
      username,
      name: `${firstName} ${lastName}`,
      image: faker.internet.avatar(),
      location: faker.address.country(),
      github: username,
      twitter: username,
      website: `https://${firstName}${lastName}.dvshr`,
    })
  }

  return users
}

const createPosts = async (users) => {
  const posts = []
  const sharePosts = []

  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    const userId = user.id

    // Update
    posts.push({
      id: cuid(),
      userId,
      type: 'update',
      content: faker.lorem.sentences(),
      private: randomBoolean(),
    })

    // Snippet
    posts.push({
      id: cuid(),
      userId,
      type: 'snippet',
      content: faker.lorem.sentences(),
      description: randomBoolean() ? faker.lorem.sentences() : null,
      private: randomBoolean(),
    })

    // Link
    posts.push({
      id: cuid(),
      userId,
      type: 'link',
      url: 'https://apple.com/',
      description: randomBoolean() ? faker.lorem.sentences() : null,
      private: randomBoolean(),
    })

    // Image
    posts.push({
      id: cuid(),
      userId,
      type: 'image',
      url: faker.random.image(),
      description: randomBoolean() ? faker.lorem.sentences() : null,
      private: randomBoolean(),
    })

    // Video
    posts.push({
      id: cuid(),
      userId,
      type: 'video',
      url: await randomUrlGen.getRandomMusicVideoUrl(),
      description: randomBoolean() ? faker.lorem.sentences() : null,
      private: randomBoolean(),
    })

    // Article
    posts.push({
      id: cuid(),
      userId,
      type: 'article',
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      private: randomBoolean(),
    })
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    const userId = user.id

    sharePosts.push({
      id: cuid(),
      userId,
      type: 'share',
      sharedPostId: randomPublicPostId(posts),
      description: randomBoolean() ? faker.lorem.sentences() : null,
      private: false,
    })
  }

  const allPosts = posts.concat(sharePosts)

  shuffle(allPosts)

  return allPosts
}

const createBookmarks = (users, posts) => {
  const bookmarks = []

  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    const postId = randomPublicPostId(posts)

    bookmarks.push({ userId: user.id, postId })
  }

  return bookmarks
}

const createComments = (posts, users) => {
  const comments = []

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const user = randomArrayElement(users)

    comments.push({
      id: cuid(),
      comment: faker.lorem.sentences(),
      userId: user.id,
      postId: post.id,
    })
  }

  return comments
}

const createFollows = (users) => {
  const follows = []

  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    const otherUsers = users.filter((el) => el.id !== user.id)

    if (otherUsers.length > 0) {
      const followUser = randomArrayElement(otherUsers)

      follows.push({ userId: user.id, followId: followUser.id })
    }
  }

  return follows
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

function randomBoolean() {
  return Math.random() < 0.5
}

function randomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function randomPublicPostId(posts) {
  const post = randomArrayElement(posts)

  if (post.private === true) {
    return randomPublicPostId(posts)
  } else {
    return post.id
  }
}
