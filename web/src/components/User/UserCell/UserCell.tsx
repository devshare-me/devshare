import User from 'src/components/User/User'
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
    <div className="flex gap-8 flex-col lg:flex-row lg:items-start">
      <div className="flex flex-col items-center w-full bg-white shadow-sm rounded-xl p-4 lg:max-w-xs">
        <div className="animate-pulse space-y-2 w-full">
          <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto" />
          <div className="bg-gray-200 rounded-md p-2 w-1/2 mx-auto" />
          <div className="bg-gray-200 rounded-md p-2 w-3/4 mx-auto" />
          <div className="bg-gray-200 rounded-md p-2 w-1/2 mx-auto" />
          <div className="bg-gray-200 rounded-md p-2 w-1/4 mx-auto" />
        </div>
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
