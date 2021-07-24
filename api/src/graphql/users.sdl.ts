export const schema = gql`
  type UserRelationCount {
    bookmarks: Int!
    comments: Int!
    followers: Int!
    following: Int!
    posts: Int!
  }
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
    defaultPostType: PostType
    createdAt: DateTime!
    _count: PostRelationCount
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
    defaultPostType: PostType
  }

  type Mutation {
    updateUser(id: String!, input: UpdateUserInput!): User!
    updateDarkMode(id: String!, darkMode: Boolean!): User!
    deleteUser(id: String!): User!
  }
`
