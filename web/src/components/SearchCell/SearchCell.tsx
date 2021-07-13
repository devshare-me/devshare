import type { FindSearchQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { feedQuery, userQuery } from 'src/utils/feedQuery'
import FeedItem from 'src/components/FeedItem'
import ProfileItem from 'src/components/ProfileItem'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ search }: CellSuccessProps<FindSearchQuery>) => {
  return (
    <div className="">
      {search.users.length > 0 && (
        <div>
          {search.users.map((user) => (
            <ProfileItem key={user.id} user={user} />
          ))}
        </div>
      )}
      {search.posts.length > 0 && (
        <div>
          {search.posts.map((post) => (
            <FeedItem key={post.id} item={post} />
          ))}
        </div>
      )}
    </div>
  )
}
