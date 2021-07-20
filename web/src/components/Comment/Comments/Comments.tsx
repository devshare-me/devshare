import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import UserPostDetails from 'src/components/UserPostDetails'

import { QUERY } from 'src/components/Comment/CommentsCell'

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const CommentsList = ({ comments }) => {
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Comment deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete comment ' + id + '?')) {
      deleteComment({ variables: { id } })
    }
  }

  return (
    <>
      {comments.map((comment, i) => (
        <div
          key={comment.id}
          className={`${
            comments.length !== i + 1
              ? 'border-b dark:border-gray-600 py-6'
              : 'pt-6'
          }`}
        >
          <UserPostDetails
            user={comment.user}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
          />
          <p className="mt-2">{comment.comment}</p>
        </div>
      ))}
    </>
  )
}

export default CommentsList
