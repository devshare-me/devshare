export const schema = gql`
  type SearchResult {
    posts: [Post!]!
    users: [User!]!
  }

  type Query {
    search(query: String): SearchResult
  }
`
