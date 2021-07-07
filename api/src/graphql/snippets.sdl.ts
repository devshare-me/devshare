export const schema = gql`
  type Snippet {
    id: String!
    user: User!
    userId: String!
    title: String!
    description: String
    content: String!
    comments: [Comment]!
  }

  type Query {
    snippets: [Snippet!]!
  }

  input CreateSnippetInput {
    userId: String!
    title: String!
    description: String
    content: String!
  }

  input UpdateSnippetInput {
    userId: String
    title: String
    description: String
    content: String
  }
`
