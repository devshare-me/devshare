export const schema = gql`
  type Notification {
    id: String!
    user: User!
    userId: String!
    type: NotificationType!
    count: Int!
    read: Boolean!
    post: Post
    postId: String
    follower: User
    followerId: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum NotificationType {
    follow
    comment
    share
  }

  type Query {
    notifications: [Notification!]!
  }

  input CreateNotificationInput {
    userId: String!
    type: NotificationType!
    count: Int!
    read: Boolean!
    postId: String
    followerId: String
  }

  input UpdateNotificationInput {
    userId: String
    type: NotificationType
    count: Int
    read: Boolean
    postId: String
    followerId: String
  }
`
