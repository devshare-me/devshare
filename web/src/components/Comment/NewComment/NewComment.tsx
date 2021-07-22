import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import CommentForm from 'src/components/Comment/CommentForm'
import { QUERY as CommentsQuery } from 'src/components/Comment/CommentsCell'

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`

const NewComment = ({ postId }) => {
  const { currentUser } = useAuth()
  const [createComment, { loading, error }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Comment created')
      },
      refetchQueries: [{ query: CommentsQuery, variables: { postId } }],
      awaitRefetchQueries: true,
    }
  )

  const onSave = (input) => {
    input.userId = currentUser?.id
    input.postId = postId
    createComment({ variables: { input } })
  }

  return <CommentForm onSave={onSave} loading={loading} error={error} />
}

export default NewComment
