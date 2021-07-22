import type { CellFailureProps } from '@redwoodjs/web'
import { Helmet } from 'react-helmet'
import { LoaderItem } from 'src/components/PostLoader'
import Illustration from 'src/components/Illustration'
import EmptyImage from 'src/lib/empty-02.svg'
import ErrorImage from 'src/lib/error.svg'
import FeedItem from 'src/components/FeedItem'

export const QUERY = gql`
  query FindPostById($id: String!) {
    post(id: $id) {
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

export const Loading = () => <LoaderItem />

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

export const Success = ({ post }) => {
  return (
    <>
      <Helmet>
        <title>
          Post by {post?.user?.name ? post.user.name : `@${post.user.username}`}
        </title>
      </Helmet>
      <FeedItem item={post} showComments={true} />
    </>
  )
}
