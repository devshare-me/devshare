import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'
import { FiBookmark } from 'react-icons/fi'

interface BookmarkProps {
  postId: string
  count: number
  bookmarked: boolean
}

const CREATE_BOOKMARK_MUTATION = gql`
  mutation CreatePostMutation($postId: String!) {
    bookmark: createBookmark(postId: $postId) {
      postId
    }
  }
`

const DELETE_BOOKMARK_MUTATION = gql`
  mutation DeleteBookmarkMutation($postId: String!) {
    deleteBookmark(postId: $postId) {
      postId
    }
  }
`

const BookmarkButton = ({ postId, count, bookmarked }: BookmarkProps) => {
  const { isAuthenticated } = useAuth()
  const [bookmarkCount, setBookmarkCount] = React.useState(count)
  const [userBookmark, setUserBookmark] = React.useState(bookmarked)

  const [createBookmark, { loading, error }] = useMutation(
    CREATE_BOOKMARK_MUTATION,
    {
      onCompleted: () => {
        setBookmarkCount(bookmarkCount + 1)
        setUserBookmark(true)
        toast.success(`Bookmark added`)
      },
    }
  )

  const [removeBookmark] = useMutation(DELETE_BOOKMARK_MUTATION, {
    onCompleted: () => {
      setBookmarkCount(bookmarkCount - 1)
      setUserBookmark(false)
      toast.success('Bookmark removed')
    },
  })

  const toggleBookmark = () => {
    if (userBookmark) {
      removeBookmark({ variables: { postId } })
    } else {
      createBookmark({ variables: { postId } })
    }
  }

  return (
    <button
      className={`${
        userBookmark
          ? 'text-blue-600 dark:text-blue-100 bg-blue-50 dark:bg-blue-800 '
          : ''
      }p-4 flex-1 flex items-center justify-center transition-colors duration-300 hover:bg-blue-100 dark:hover:bg-blue-800 dark:bg-opacity-75`}
      onClick={toggleBookmark}
      disabled={!isAuthenticated || loading ? true : false}
    >
      <FiBookmark />
      {bookmarkCount > 0 && (
        <span className="ml-1 text-xs">{bookmarkCount}</span>
      )}
      <span className="sr-only">{'Bookmark(s)'}</span>
    </button>
  )
}

export default BookmarkButton
