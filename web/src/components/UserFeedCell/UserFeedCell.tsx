import type { FindUserFeedQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import FeedItem from 'src/components/FeedItem'
import PostLoader from 'src/components/PostLoader'

export const QUERY = gql`
  query USERFEED($username: String!, $filter: String) {
    feed: userFeed(username: $username, filter: $filter) {
      id
      type
      user {
        name
        image
        username
      }
      title
      url
      content
      description
      private
      createdAt
    }
  }
`

export const Loading = () => <PostLoader />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ feed }: CellSuccessProps<FindUserFeedQuery>) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {feed.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  )
}
