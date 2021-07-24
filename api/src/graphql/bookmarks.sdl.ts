export const schema = gql`
  type Bookmark {
    post: Post!
    postId: String!
    user: User!
    userId: String!
    createdAt: DateTime!
  }

  type Query {
    bookmarks: [Post!]!
  }

  type Mutation {
    createBookmark(postId: String!): Bookmark!
    deleteBookmark(postId: String!): Bookmark!
  }
`
