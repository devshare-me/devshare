export const schema = gql`
  type Article {
    id: String!
    user: User!
    userId: String!
    title: String!
    content: String!
    comments: [Comment]!
  }

  type Query {
    articles: [Article!]!
  }

  input CreateArticleInput {
    userId: String!
    title: String!
    content: String!
  }

  input UpdateArticleInput {
    userId: String
    title: String
    content: String
  }
`
