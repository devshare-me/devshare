export const schema = gql`
  type Update {
    id: String!
    user: User!
    userId: String!
    content: String!
    comments: [Comment]!
  }

  type Query {
    updates: [Update!]!
  }

  input CreateUpdateInput {
    userId: String!
    content: String!
  }

  input UpdateUpdateInput {
    userId: String
    content: String
  }
`
