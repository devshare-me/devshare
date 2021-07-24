import type { BookmarksQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import FeedWrapper from 'src/components/FeedWrapper'
import FeedItem from 'src/components/FeedItem'
import PostLoader from 'src/components/PostLoader'
import Illustration from 'src/components/Illustration'
import EmptyImage from 'src/lib/empty-02.svg'
import ErrorImage from 'src/lib/error.svg'

export const QUERY = gql`
  query BookmarksQuery {
    bookmarks {
      id
      type
      user {
        name
        image
        username
      }
      bookmarkedBy {
        createdAt
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
  <Illustration image={EmptyImage} message="No bookmarks yet" />
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

export const Success = ({ bookmarks }: CellSuccessProps<BookmarksQuery>) => {
  const sortedPosts = [...bookmarks].sort(function (a, b) {
    const first = a.bookmarkedBy[0].createdAt
    const second = b.bookmarkedBy[0].createdAt

    return first < second ? 1 : second < first ? -1 : 0
  })

  return (
    <FeedWrapper>
      {sortedPosts.map((bookmark) => (
        <FeedItem key={bookmark.id} item={bookmark} />
      ))}
    </FeedWrapper>
  )
}
