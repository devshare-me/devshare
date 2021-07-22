import type { FindComments } from 'types/graphql'
import type { CellSuccessProps } from '@redwoodjs/web'

import Comments from 'src/components/Comment/Comments'

export const QUERY = gql`
  query FindComments($postId: String!, $parentId: String) {
    comments(postId: $postId, parentId: $parentId) {
      id
      comment
      user {
        id
        name
        username
        image
      }
      post {
        id
        userId
      }
      parentId
      createdAt
      updatedAt
    }
  }
`

export const Loading = ({ count }) => (
  <>
    {[...Array(count)].map((e, i) => (
      <LoaderItem key={i} last={count === i + 1 ? true : false} />
    ))}
  </>
)

export const Empty = () => {
  return <></>
}

export const Success = ({
  comments,
  count,
  setCount,
}: CellSuccessProps<FindComments>) => {
  return <Comments comments={comments} count={count} setCount={setCount} />
}

const LoaderItem = ({ last }) => {
  return (
    <div
      className={`${
        !last ? 'border-b dark:border-gray-600 py-6' : 'pt-6'
      } w-full`}
    >
      <div className="animate-pulse space-y-2">
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-1/4" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-full" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-full" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-1/2" />
      </div>
    </div>
  )
}
