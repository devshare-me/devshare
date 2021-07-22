import type { FindUserFeedQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import FeedWrapper from 'src/components/FeedWrapper'
import FeedItem from 'src/components/FeedItem'
import PostLoader from 'src/components/PostLoader'
import Illustration from 'src/components/Illustration'
import EmptyImage from 'src/lib/empty-01.svg'
import ErrorImage from 'src/lib/error.svg'

export const QUERY = gql`
  query USER_FEED($username: String!, $filter: String) {
    feed: userFeed(username: $username, filter: $filter) {
      id
      type
      user {
        name
        image
        username
      }
      shares {
        id
      }
      bookmarkedBy {
        userId
      }
      title
      url
      content
      description
      private
      createdAt
      updatedAt
      sharedPost {
        id
        type
        user {
          name
          image
          username
        }
        shares {
          id
        }
        bookmarkedBy {
          userId
        }
        title
        url
        content
        description
        private
        createdAt
        updatedAt
      }
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
    <FeedWrapper>
      {feed.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </FeedWrapper>
  )
}
