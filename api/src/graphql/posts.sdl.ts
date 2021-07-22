export const schema = gql`
  type PostRelationCount {
    shares: Int!
    comments: Int!
    bookmarkedBy: Int!
  }
  type Post {
    id: String!
    user: User!
    userId: String!
    type: PostType!
    title: String
    url: String
    content: String
    description: String
    sharedPost: Post
    sharedPostId: String
    shares: [Post]!
    private: Boolean!
    comments: [Comment]!
    bookmarkedBy: [Bookmark]!
    createdAt: DateTime!
    updatedAt: DateTime!
    _count: PostRelationCount
  }

  enum PostType {
    update
    snippet
    article
    link
    image
    video
    share
  }

  type Query {
    posts: [Post!]!
    post(id: String!): Post
  }

  input CreatePostInput {
    userId: String
    type: PostType!
    title: String
    url: String
    content: String
    description: String
    sharedPostId: String
    private: Boolean!
  }

  input UpdatePostInput {
    userId: String
    type: PostType
    title: String
    url: String
    content: String
    description: String
    sharedPostId: String
    private: Boolean
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: String!, input: UpdatePostInput!): Post!
    deletePost(id: String!): Post!
  }
`
