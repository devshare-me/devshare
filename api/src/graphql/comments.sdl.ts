export const schema = gql`
  type Comment {
    id: String!
    comment: String!
    user: User!
    userId: String!
    post: Post!
    postId: String!
    parentId: String
    parent: Comment
    replies: [Comment]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    comments: [Comment!]!
  }

  input CreateCommentInput {
    comment: String!
    userId: String!
    postId: String!
    parentId: String
  }

  input UpdateCommentInput {
    comment: String
    userId: String
    postId: String
    parentId: String
  }
`
