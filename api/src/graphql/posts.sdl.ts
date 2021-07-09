export const schema = gql`
  type Post {
    id: String!
    user: User!
    userId: String!
    type: PostType!
    title: String
    url: String
    content: String
    description: String
    private: Boolean!
    comments: [Comment]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum PostType {
    update
    snippet
    article
    link
    video
  }

  type Query {
    posts: [Post!]!
    post(id: String!): Post
  }

  input CreatePostInput {
    type: PostType!
    title: String
    url: String
    content: String
    description: String
    private: Boolean!
  }

  input UpdatePostInput {
    type: PostType
    title: String
    url: String
    content: String
    description: String
    private: Boolean
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: String!, input: UpdatePostInput!): Post!
    deletePost(id: String!): Post!
  }
`
