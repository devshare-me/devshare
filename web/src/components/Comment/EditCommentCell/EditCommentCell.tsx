import type { EditCommentById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import CommentForm from 'src/components/Comment/CommentForm'

export const QUERY = gql`
  query EditCommentById($id: String!) {
    comment(id: $id) {
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
const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateCommentMutation($id: String!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ comment }: CellSuccessProps<EditCommentById>) => {
  const [updateComment, { loading, error }] = useMutation(
    UPDATE_COMMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Comment updated')
        navigate(routes.comments())
      },
    }
  )

  const onSave = (input, id) => {
    updateComment({ variables: { id, input } })
  }

  return (
    <CommentForm
      comment={comment}
      onSave={onSave}
      error={error}
      loading={loading}
    />
  )
}
