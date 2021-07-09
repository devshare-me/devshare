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
    posts: [Post]!
    comments: [Comment]!
    createdAt: DateTime!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
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

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
    deleteUser(id: String!): User!
  }
`
