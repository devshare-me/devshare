export const schema = gql`
  type Comment {
    id: String!
    user: User!
    userId: String!
    update: Update
    updateId: String
    article: Article
    articleId: String
    snippet: Snippet
    snippetId: String
    link: Link
    linkId: String
    parentId: String
    parent: Comment
    replies: [Comment]!
  }

  type Query {
    comments: [Comment!]!
  }

  input CreateCommentInput {
    userId: String!
    updateId: String
    articleId: String
    snippetId: String
    linkId: String
    parentId: String
  }

  input UpdateCommentInput {
    userId: String
    updateId: String
    articleId: String
    snippetId: String
    linkId: String
    parentId: String
  }
`
