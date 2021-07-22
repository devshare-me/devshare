import type { FindFollowingFeedQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import FeedWrapper from 'src/components/FeedWrapper'
import FeedItem from 'src/components/FeedItem'
import PostLoader from 'src/components/PostLoader'
import Illustration from 'src/components/Illustration'
import EmptyImage from 'src/lib/empty-02.svg'
import ErrorImage from 'src/lib/error.svg'

export const QUERY = gql`
  query FindFollowingFeedQuery($filter: String) {
    feed: followingFeed(filter: $filter) {
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
      _count {
        comments
        shares
        bookmarkedBy
      }
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
        _count {
          comments
          shares
          bookmarkedBy
        }
      }
    }
  }
`

export const Loading = () => <PostLoader />

export const Empty = () => (
  <Illustration image={EmptyImage} message="No posts to show" />
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

export const Success = ({ feed }: CellSuccessProps<FindFollowingFeedQuery>) => {
  return (
    <FeedWrapper>
      {feed.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </FeedWrapper>
  )
}
