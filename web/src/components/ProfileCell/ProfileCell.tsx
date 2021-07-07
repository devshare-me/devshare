import type { FindProfileQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Profile from 'src/components/Profile'

export const QUERY = gql`
  query FindProfileQuery($username: String!) {
    user: user(username: $username) {
      username
      name
      image
      location
      github
      twitter
      website
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ user }: CellSuccessProps<FindProfileQuery>) => {
  return <Profile user={user} />
}
