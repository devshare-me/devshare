export const schema = gql`
  type Link {
    id: String!
    user: User!
    userId: String!
    url: String!
    content: String
    comments: [Comment]!
  }

  type Query {
    links: [Link!]!
  }

  input CreateLinkInput {
    userId: String!
    url: String!
    content: String
  }

  input UpdateLinkInput {
    userId: String
    url: String
    content: String
  }
`
