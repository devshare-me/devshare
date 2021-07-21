import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'
import UserPostDetails from 'src/components/UserPostDetails'
import Modal from 'src/components/Modal'
import { FiMoreHorizontal, FiTrash, FiThumbsDown } from 'react-icons/fi'

import { QUERY } from 'src/components/Comment/CommentsCell'

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`

const CommentItem = ({ comment, last = false }) => {
  const { currentUser, isAuthenticated } = useAuth()
  const [optionsOpen, setOptionsOpen] = React.useState(false)
  const [deleteVisible, setDeleteVisible] = React.useState(false)

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Comment deleted')
    },
    refetchQueries: [{ query: QUERY, variables: { postId: comment.post.id } }],
    awaitRefetchQueries: true,
  })

  const onDeleteButtonClick = () => {
    setOptionsOpen(false)
    setTimeout(() => {
      setDeleteVisible(true)
    }, 250)
  }

  const onDeleteClick = () => {
    deleteComment({ variables: { id: comment.id } })
    setDeleteVisible(false)
  }

  return (
    <>
      <div
        className={`${!last ? 'border-b dark:border-gray-600 py-6' : 'pt-6'}`}
      >
        <div className="flex items-center justify-between mb-2 text-xs">
          <UserPostDetails
            user={comment.user}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
          />
          <div className="flex items-center text-sm">
            <button className="px-2 py-1" onClick={() => setOptionsOpen(true)}>
              <FiMoreHorizontal />
              <span className="sr-only">More comment options</span>
            </button>
          </div>
        </div>
        <p className="mt-2">{comment.comment}</p>
      </div>

      <Modal
        isOpen={optionsOpen}
        setIsOpen={setOptionsOpen}
        title="More comment options"
      >
        <nav className="text-base flex flex-col items-start space-y-1 -mx-2">
          <Link
            to={routes.report({ id: comment.id, type: 'comment' })}
            className="flex items-center p-2 w-full rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <FiThumbsDown className="mr-2" />
            Report comment
          </Link>
          {isAuthenticated &&
            (comment.user.username === currentUser?.username ||
              comment.post.userId === currentUser?.id) && (
              <>
                <button
                  className="flex items-center p-2 w-full rounded-md text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800 dark:hover:bg-opacity-25"
                  onClick={onDeleteButtonClick}
                >
                  <FiTrash className="mr-2" />
                  Delete comment
                </button>
              </>
            )}
        </nav>
      </Modal>

      <Modal
        isOpen={deleteVisible}
        setIsOpen={setDeleteVisible}
        title="Delete comment"
        color="red"
      >
        <div className="space-y-2">
          <p>Are you sure you want to delete this comment?</p>
          <p>
            <strong>This cannot be recovered!</strong>
          </p>
          <div className="flex items-center justify-end space-x-2 pt-6">
            <button
              onClick={() => {
                setDeleteVisible(false)
              }}
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-md transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onDeleteClick}
              className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-red-900 dark:text-red-100 bg-red-200 dark:bg-red-800 border border-transparent rounded-md transition-colors duration-300 hover:bg-red-300 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete comment
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CommentItem
