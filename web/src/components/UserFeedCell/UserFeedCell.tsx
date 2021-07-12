import type { FindUserFeedQuery } from 'types/graphql'
import { feedQuery } from 'src/utils/feedQuery'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import FeedItem from 'src/components/FeedItem'
import PostLoader from 'src/components/PostLoader'
import Illustration from 'src/components/Illustration'
import EmptyImage from 'src/lib/empty-01.svg'
import ErrorImage from 'src/lib/error.svg'

export const QUERY = gql`
  query USERFEED($username: String!, $filter: String) {
    feed: userFeed(username: $username, filter: $filter) {
      ${feedQuery}
    }
  }
`

export const Loading = () => <PostLoader />

export const Empty = () => (
  <Illustration image={EmptyImage} message="No posts yet" />
)

export const Failure = ({ error }: CellFailureProps) => {
  console.log(error)
  return (
    <Illustration
      image={ErrorImage}
      message="Error: Please refresh the page and try again"
    />
  )
}

export const Success = ({ feed }: CellSuccessProps<FindUserFeedQuery>) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {feed.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  )
}
