export const schema = gql`
  type Follow {
    userId: String!
    followId: String!
  }

  type Query {
    checkFollow(userId: String!, followId: String!): Boolean!
  }

  input FollowInput {
    userId: String!
    followId: String!
  }

  type Mutation {
    createFollow(userId: String!, followId: String!): User!
    removeFollow(userId: String!, followId: String!): User!
  }
`
