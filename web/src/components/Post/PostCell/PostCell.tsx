import { feedQuery } from 'src/utils/feedQuery'
import type { CellFailureProps } from '@redwoodjs/web'
import { Helmet } from 'react-helmet'
import PostLoader from 'src/components/PostLoader'
import Illustration from 'src/components/Illustration'
import EmptyImage from 'src/lib/empty-02.svg'
import ErrorImage from 'src/lib/error.svg'
import FeedItem from 'src/components/FeedItem'

export const QUERY = gql`
  query FindPostById($id: String!) {
    post: post(id: $id) {
      ${feedQuery}
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
