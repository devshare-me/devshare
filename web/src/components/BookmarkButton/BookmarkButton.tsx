import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'
import { FiBookmark } from 'react-icons/fi'
import { UserBookmarksContext } from 'src/components/Providers'
import { QUERY as BookmarksQuery } from 'src/components/BookmarksCell'

interface BookmarkProps {
  postId: string
  count: number
  setCount: any
  bookmarked: boolean
}

const CREATE_BOOKMARK_MUTATION = gql`
  mutation CreateBookmarkMutation($postId: String!) {
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

const BookmarkButton = ({ postId, count, setCount }: BookmarkProps) => {
  const { isAuthenticated } = useAuth()
  const { userBookmarks, setUserBookmarks } =
    React.useContext(UserBookmarksContext)

  const currentUserBookmark = userBookmarks.includes(postId)

  const bookmarksCopy = [...userBookmarks]

  const [createBookmark, { loading }] = useMutation(CREATE_BOOKMARK_MUTATION, {
    onCompleted: () => {
      setCount(count + 1)
      bookmarksCopy.push(postId)
      setUserBookmarks(bookmarksCopy)
      toast.success(`Bookmark added`)
    },
    refetchQueries: [{ query: BookmarksQuery }],
    awaitRefetchQueries: true,
  })

  const [removeBookmark] = useMutation(DELETE_BOOKMARK_MUTATION, {
    onCompleted: () => {
      setCount(count - 1)
      const filtered = bookmarksCopy.filter((value) => {
        return value !== postId
      })
      setUserBookmarks(filtered)
      toast.success('Bookmark removed')
    },
    refetchQueries: [{ query: BookmarksQuery }],
    awaitRefetchQueries: true,
  })

  const toggleBookmark = () => {
    if (currentUserBookmark) {
      removeBookmark({ variables: { postId } })
    } else {
      createBookmark({ variables: { postId } })
    }
  }

  return (
    <button
      className={`${
        currentUserBookmark
          ? 'text-blue-600 dark:text-blue-100 bg-blue-50 dark:bg-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800'
          : 'hover:bg-gray-200 dark:hover:bg-gray-600'
      } p-4 flex-1 flex items-center justify-center transition-colors duration-300 dark:bg-opacity-75`}
      onClick={toggleBookmark}
      disabled={!isAuthenticated || loading ? true : false}
    >
      <FiBookmark />
      {count > 0 && <span className="ml-1 text-xs">{count}</span>}
      <span className="sr-only">{'Bookmark(s)'}</span>
    </button>
  )
}

export default BookmarkButton
