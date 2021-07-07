export const schema = gql`
  type User {
    id: String!
    email: String!
    username: String!
    name: String
    image: String
    location: String
    github: String
    twitter: String
    website: String
    updates: [Update]!
    articles: [Article]!
    snippets: [Snippet]!
    links: [Link]!
    comments: [Comment]!
  }

  type Query {
    users: [User!]!
    user(username: String!): User
  }

  input CreateUserInput {
    email: String!
    username: String!
    name: String
    image: String
    location: String
    github: String
    twitter: String
    website: String
  }

  input UpdateUserInput {
    email: String
    username: String
    name: String
    image: String
    location: String
    github: String
    twitter: String
    website: String
  }
`
