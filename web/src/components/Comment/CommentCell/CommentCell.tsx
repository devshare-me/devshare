import type { FindCommentById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Comment from 'src/components/Comment/Comment'

export const QUERY = gql`
  query FindCommentById($id: String!) {
    comment: comment(id: $id) {
      id
      comment
      userId
      postId
      parentId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Comment not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ comment }: CellSuccessProps<FindCommentById>) => {
  return <Comment comment={comment} />
}
