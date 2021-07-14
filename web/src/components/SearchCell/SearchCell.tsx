import type { FindSearchQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { feedQuery, userQuery } from 'src/utils/feedQuery'
import FeedItem from 'src/components/FeedItem'
import ProfileItem from 'src/components/ProfileItem'
import ProfileLoader from 'src/components/ProfileLoader'
import PostLoader from 'src/components/PostLoader'

export const QUERY = gql`
  query FindSearchQuery($query: String!) {
    search(query: $query) {
      posts {
        ${feedQuery}
      }
      users {
        ${userQuery}
      }
    }
  }
`

export const Loading = () => (
  <SearchLayout
    users={
      <>
        <ProfileLoader />
        <ProfileLoader />
        <ProfileLoader />
      </>
    }
    posts={
      <div className="-mt-4">
        <PostLoader />
      </div>
    }
  />
)

export const Empty = () => <SearchLayout users={[]} posts={[]} />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  search,
  query,
}: CellSuccessProps<FindSearchQuery>) => {
  return (
    <SearchLayout
      users={
        <>
          {search.users.length > 0 ? (
            search.users.map((user) => (
              <ProfileItem key={user.id} user={user} link={true} />
            ))
          ) : (
            <p>No users found</p>
          )}
        </>
      }
      posts={
        <>
          {search.posts.length > 0 ? (
            search.posts.map((post) => <FeedItem key={post.id} item={post} />)
          ) : (
            <p>No posts found</p>
          )}
        </>
      }
    />
  )
}

const SearchLayout = ({ posts, users }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start">
      <div className="w-full mb-8 lg:max-w-xs lg:mr-8 lg:mb-0">
        <h2 className="font-bold text-xl mb-2">Users</h2>
        <div className="grid grid-cols-1 gap-4 mt-4">{users}</div>
      </div>
      <div className="flex-1">
        <h2 className="font-bold text-xl mb-2">Posts</h2>
        <div className="grid grid-cols-1 gap-4 mt-4">{posts}</div>
      </div>
    </div>
  )
}
