import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, useParams, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { QUERY as ProfileQuery } from 'src/components/UserFeedCell'
import { QUERY as RecentQuery } from 'src/components/RecentFeedCell'
import NewPost from 'src/components/Post/NewPost'
import UserPostDetails from 'src/components/UserPostDetails'
import TimeTag from 'src/components/TimeTag'
import BookmarkButton from 'src/components/BookmarkButton'
import CommentDialog from 'src/components/CommentDialog'
import VideoPost from 'src/components/PostElements/VideoPost'
import ImagePost from 'src/components/PostElements/ImagePost'
import LinkPostCell from 'src/components/PostElements/LinkPostCell'
import Modal from 'src/components/Modal'
import { filters } from 'src/utils/filters'
import {
  FiLock,
  FiMoreHorizontal,
  FiExternalLink,
  FiTrash,
  FiThumbsDown,
  FiEdit3,
  FiMessageCircle,
  FiCornerUpRight,
} from 'react-icons/fi'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: String!) {
    deletePost(id: $id) {
      id
    }
  }
`

const FeedItem = ({ item, viewPost = false, showComments = false }) => {
  const type =
    item.type === 'share' && !item.description
      ? item.sharedPost.type
      : item.type
  const { currentUser, isAuthenticated } = useAuth()
  const { username, filter, view } = useParams()
  const { pathname } = useLocation()

  const itemCheck =
    item.type === 'share' && !item.description ? item.sharedPost : item

  const [menuVisible, setMenuVisible] = React.useState(false)
  const [repostVisible, setRepostVisible] = React.useState(false)
  const [deleteVisible, setDeleteVisible] = React.useState(false)
  const [commentsVisible, setCommentsVisible] = React.useState(showComments)

  let filterAttr = filters.find(
    (x) => x.singular === type.charAt(0).toUpperCase() + type.slice(1)
  )

  if (filterAttr === undefined) {
    filterAttr = {
      name: 'Shares',
      singular: 'Share',
      icon: FiCornerUpRight,
      color: 'gray',
    }
  }

  let currentUserBookmark =
    isAuthenticated && itemCheck?.bookmarkedBy
      ? itemCheck.bookmarkedBy.filter(function (e) {
          if (e.userId === currentUser.id) {
            return true
          }
          return false
        })
      : false

  currentUserBookmark = currentUserBookmark.length ? true : false

  const refetchQuery = {
    query:
      view === 'recent' ? RecentQuery : pathname === '/' ? '' : ProfileQuery,
    variables: { username, filter },
  }

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post deleted')
    },
    refetchQueries: [refetchQuery],
    awaitRefetchQueries: true,
  })

  const onDeleteButtonClick = () => {
    setMenuVisible(false)
    setTimeout(() => {
      setDeleteVisible(true)
    }, 250)
  }

  const onDeleteClick = () => {
    deletePost({ variables: { id: item.id, username: currentUser.username } })
    setDeleteVisible(false)
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 flex-1 border border-gray-200 dark:border-gray-600 overflow-hidden rounded-xl">
        {item.type === 'share' && !item.description && (
          <div className="bg-gray-50 dark:bg-gray-700 flex items-center px-6 py-2 -mx-6 -mt-6 mb-6 text-xs text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
            <FiCornerUpRight className="mr-1" />
            <span>
              <Link to={routes.profile({ username: item.user.username })}>
                {item.user.name}
              </Link>{' '}
              <TimeTag datetime={item.createdAt} />
            </span>
          </div>
        )}
        <div className="flex items-center justify-between mb-2 text-xs">
          <UserPostDetails
            user={itemCheck.user}
            createdAt={itemCheck.createdAt}
            updatedAt={itemCheck.updatedAt}
          />
          <div className="flex items-center text-sm">
            {itemCheck.private === true && (
              <FiLock className="text-gray-400 mr-2" />
            )}
            <div
              className={`rounded-full p-2 font-semibold text-${filterAttr.color}-700 dark:text-${filterAttr.color}-100 bg-${filterAttr.color}-100 dark:bg-${filterAttr.color}-600`}
            >
              <filterAttr.icon />
            </div>
          </div>
        </div>
        {itemCheck.title && (
          <h3 className="font-bold text-lg">{itemCheck.title}</h3>
        )}
        {itemCheck.description && <p>{itemCheck.description}</p>}
        {itemCheck.content && <p>{itemCheck.content}</p>}
        {itemCheck.type === 'video' && (
          <div className="-mx-6 mt-6 -mb-6">
            <VideoPost url={itemCheck.url} />
          </div>
        )}
        {itemCheck.type === 'image' && (
          <div className="-mx-6 mt-6 -mb-6">
            <ImagePost url={itemCheck.url} />
          </div>
        )}
        {itemCheck.type === 'link' && (
          <div className="-mx-6 mt-6 -mb-6">
            <LinkPostCell url={itemCheck.url} />
          </div>
        )}
        {item.type === 'share' && item.description && (
          <div className="mt-4">
            <FeedItem item={item.sharedPost} viewPost={true} />
          </div>
        )}
        <nav
          className={`${
            !commentsVisible ? '-mb-6 ' : ''
          }flex items-stretch bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-t border-gray-200 dark:border-gray-600 mt-6 -mx-6`}
        >
          {viewPost ? (
            <Link
              to={routes.post({ id: itemCheck.id })}
              className="px-2 py-1 text-xs flex-1 text-center"
            >
              View original {type} post
            </Link>
          ) : (
            <>
              {!itemCheck.private && (
                <>
                  <button
                    className={`${
                      commentsVisible ? 'bg-white dark:bg-gray-800' : ''
                    } p-4 flex-1 flex items-center justify-center transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-600`}
                    onClick={() => setCommentsVisible(!commentsVisible)}
                    disabled={
                      !isAuthenticated && itemCheck?._count?.comments === 0
                        ? true
                        : false
                    }
                  >
                    <FiMessageCircle />
                    {itemCheck?._count?.comments > 0 && (
                      <span className="ml-1 text-xs">
                        {itemCheck._count.comments}
                      </span>
                    )}
                    <span className="sr-only">{'Comment(s)'}</span>
                  </button>
                  {itemCheck.type !== 'share' && (
                    <button
                      className="p-4 flex-1 flex items-center justify-center transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => {
                        if (isAuthenticated) setRepostVisible(true)
                      }}
                      disabled={!isAuthenticated}
                    >
                      <FiCornerUpRight />
                      {itemCheck?._count?.shares > 0 && (
                        <span className="ml-1 text-xs">
                          {itemCheck._count.shares}
                        </span>
                      )}
                      <span className="sr-only">{'Share(s)'}</span>
                    </button>
                  )}
                  <BookmarkButton
                    postId={itemCheck.id}
                    count={itemCheck?._count?.bookmarkedBy}
                    bookmarked={currentUserBookmark}
                  />
                </>
              )}
              <button
                className="p-4 flex-1 flex items-center justify-center transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={() => setMenuVisible(true)}
              >
                <FiMoreHorizontal />
                <span className="sr-only">More options</span>
              </button>
            </>
          )}
        </nav>
        {commentsVisible && (
          <CommentDialog
            postId={itemCheck.id}
            count={itemCheck._count.comments}
          />
        )}
      </div>

      <Modal
        isOpen={menuVisible}
        setIsOpen={setMenuVisible}
        title={`More ${filterAttr.singular.toLowerCase()} post options`}
        color={filterAttr.color}
      >
        <nav className="text-base flex flex-col items-start space-y-1 -mx-2">
          {pathname !== routes.post({ id: itemCheck.id }) && (
            <Link
              to={routes.post({ id: itemCheck.id })}
              className="flex items-center p-2 w-full rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <FiExternalLink className="mr-2" />
              View {filterAttr.singular.toLowerCase()} post page
            </Link>
          )}
          {itemCheck.user.username === currentUser?.username && (
            <Link
              to={routes.editPost({ id: itemCheck.id })}
              className="flex items-center p-2 w-full rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <FiEdit3 className="mr-2" />
              Edit {filterAttr.singular.toLowerCase()} post
            </Link>
          )}
          <Link
            to={routes.report({ id: itemCheck.id })}
            className="flex items-center p-2 w-full rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <FiThumbsDown className="mr-2" />
            Report {filterAttr.singular.toLowerCase()} post
          </Link>
          {item.user.username === currentUser?.username && (
            <>
              <button
                className="flex items-center p-2 w-full rounded-md text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800 dark:hover:bg-opacity-25"
                onClick={onDeleteButtonClick}
              >
                <FiTrash className="mr-2" />
                Delete {item.type} post
              </button>
            </>
          )}
        </nav>
      </Modal>

      <Modal
        isOpen={deleteVisible}
        setIsOpen={setDeleteVisible}
        title="Delete post"
        color="red"
      >
        <div className="space-y-2">
          <p>
            Are you sure you want to delete this post?{' '}
            {!itemCheck.private &&
              `All comments, bookmarks,
            and shares will also be deleted.`}
          </p>
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
              Delete post
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={repostVisible}
        setIsOpen={setRepostVisible}
        title={`Repost ${filterAttr.singular.toLowerCase()}`}
        color={filterAttr.color}
      >
        <div className="-mx-6 -mb-6 post-dialog">
          <NewPost
            type="share"
            setSharePost={setRepostVisible}
            sharedPostId={itemCheck.id}
          />
        </div>
      </Modal>
    </>
  )
}

export default FeedItem
