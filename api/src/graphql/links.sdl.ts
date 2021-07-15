export const schema = gql`
  type OgData {
    title: String
    description: String
    image: String
  }

  type Query {
    ogData(url: String!): OgData!
  }
`
