import User from 'src/components/User/User'

export const QUERY = gql`
  query FindUserById($username: String!) {
    user: user(username: $username) {
      id
      username
      name
      image
      location
      github
      twitter
      website
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Success = ({ user }) => {
  return <User user={user} />
}
