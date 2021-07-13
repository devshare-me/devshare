import User from 'src/components/User/User'
import ProfileLoader from 'src/components/ProfileLoader'
import PostLoader from 'src/components/PostLoader'

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

export const Loading = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start">
      <div className="w-full mb-8 lg:sticky lg:top-20 lg:max-w-xs lg:mr-8 lg:mb-0">
        <ProfileLoader />
      </div>
      <div className="flex-1">
        <PostLoader />
      </div>
    </div>
  )
}

export const Empty = () => <div>User not found</div>

export const Success = ({ user }) => {
  return <User user={user} />
}
