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
    followers: [User]!
    following: [User]!
    bookmarks: [Bookmark]!
    darkMode: Boolean!
    createdAt: DateTime!
  }

  type Query {
    users: [User!]!
    user(username: String!): User
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
    darkMode: Boolean!
  }

  type Mutation {
    updateUser(id: String!, input: UpdateUserInput!): User!
    updateDarkMode(id: String!, darkMode: Boolean!): User!
    deleteUser(id: String!): User!
  }
`
