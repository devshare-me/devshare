export const schema = gql`
  type Query {
    followingFeed(filter: String): [Post!]!
    recentFeed(filter: String): [Post!]!
    userFeed(username: String!, filter: String): [Post!]!
  }
`
