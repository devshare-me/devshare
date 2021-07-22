export const schema = gql`
  type UserStats {
    total: Int!
    pastWeek: Int!
    pastMonth: Int!
    pastYear: Int!
  }

  type PostStats {
    total: Int!
    updates: Int!
    snippets: Int!
    articles: Int!
    links: Int!
    images: Int!
    videos: Int!
    shares: Int!
    private: Int!
  }

  type Stats {
    users: UserStats!
    posts: PostStats!
    comments: Int!
    bookmarks: Int!
  }

  type Query {
    stats: Stats!
  }
`
