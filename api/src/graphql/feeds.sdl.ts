export const schema = gql`
  union Post = Update | Snippet | Article | Link

  type Feed {
    posts: [Post]
  }

  type Query {
    followingFeed(filter: String): Feed!
    recentFeed(filter: String): Feed!
    userFeed(username: String!, filter: String): Feed!
  }
`

export const resolvers = {
  Post: {
    __resolveType(obj) {
      if (obj.url) return 'Link'

      if (obj.private) return 'Snippet'

      if (obj.title) {
        return 'Article'
      } else {
        return 'Update'
      }
    },
  },
}
