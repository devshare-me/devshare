import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, useParams, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { QUERY as ProfileQuery } from 'src/components/UserFeedCell'
import { QUERY as RecentQuery } from 'src/components/RecentFeedCell'
import NewPost from 'src/components/Post/NewPost'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import TimeTag from 'src/components/TimeTag'
import BookmarkButton from 'src/components/BookmarkButton'
import { filters } from 'src/utils/filters'
import {
  FiLock,
  FiMoreHorizontal,
  FiExternalLink,
  FiX,
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

const FeedItem = ({ item, viewPost = false }) => {
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

  let currentUserBookmark = itemCheck?.bookmarkedBy
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

  const onDeleteClick = () => {
    if (
      confirm(
        `Are you sure you want to delete this ${filterAttr.singular.toLowerCase()} post?`
      )
    ) {
      deletePost({ variables: { id: item.id } })
      setMenuVisible(false)
    }
  }

  return (
    <>
      <div className="bg-white p-6 flex-1 border border-gray-200 overflow-hidden rounded-xl">
        {item.type === 'share' && !item.description && (
          <div className="bg-gray-50 flex items-center px-6 py-2 -mx-6 -mt-6 mb-6 text-xs text-gray-600 border-b border-gray-200">
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
          <div className="flex items-center gap-2">
            <Link
              to={routes.profile({ username: itemCheck.user.username })}
              className="flex items-center"
            >
              {itemCheck.user?.image && (
                <div className="w-10 h-10 mr-2 overflow-hidden rounded-full">
                  <img
                    src={itemCheck.user.image}
                    alt={itemCheck.user?.name || itemCheck.user.username}
                    className="content-cover"
                  />
                </div>
              )}
              <span className="font-semibold text-base">
                {itemCheck.user?.name || '@' + itemCheck.user.username}
              </span>
            </Link>
            <span className="text-gray-600 text-xs">
              <TimeTag datetime={itemCheck.createdAt} />
            </span>
            {itemCheck.updatedAt &&
              itemCheck.createdAt !== itemCheck.updatedAt && (
                <span className="text-gray-600 text-xs">Edited</span>
              )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            {itemCheck.private === true && <FiLock className="text-gray-400" />}
            <div
              className={`rounded-full p-2 font-semibold text-${filterAttr.color}-700 bg-${filterAttr.color}-100`}
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
        {item.type === 'share' && item.description && (
          <div className="mt-4">
            <FeedItem item={item.sharedPost} viewPost={true} />
          </div>
        )}
        <nav className="flex items-stretch bg-gray-50 text-gray-600 border-t border-gray-200 mt-6 -mx-6 -mb-6">
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
                  <button className="p-4 flex-1 flex items-center justify-center transition-colors duration-300 hover:bg-gray-200">
                    <FiMessageCircle />
                    <span className="ml-1 text-xs">23</span>
                    <span className="sr-only">{'Comment(s)'}</span>
                  </button>
                  {itemCheck.type !== 'share' && (
                    <button
                      className="p-4 flex-1 flex items-center justify-center transition-colors duration-300 hover:bg-gray-200"
                      onClick={() => setRepostVisible(true)}
                    >
                      <FiCornerUpRight />
                      {itemCheck?.shares.length > 0 && (
                        <span className="ml-1 text-xs">
                          {itemCheck.shares.length}
                        </span>
                      )}
                      <span className="sr-only">{'Share(s)'}</span>
                    </button>
                  )}
                  <BookmarkButton
                    postId={itemCheck.id}
                    count={itemCheck.bookmarkedBy.length}
                    bookmarked={currentUserBookmark}
                  />
                </>
              )}
              <button
                className="p-4 flex-1 flex items-center justify-center transition-colors duration-300 hover:bg-gray-200"
                onClick={() => setMenuVisible(true)}
              >
                <FiMoreHorizontal />
                <span className="sr-only">More options</span>
              </button>
            </>
          )}
        </nav>
      </div>
      <Transition appear show={menuVisible} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setMenuVisible(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className={`fixed inset-0 bg-${filterAttr.color}-200 bg-opacity-95`}
              />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xs p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div>
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      More {filterAttr.singular.toLowerCase()} post options
                    </Dialog.Title>
                    <button
                      type="button"
                      className={`inline-flex justify-center p-2 text-sm font-medium text-gray-900 bg-gray-200 border border-transparent rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                      onClick={() => setMenuVisible(false)}
                    >
                      <FiX />
                    </button>
                  </div>
                  <nav className="mt-4 text-base flex flex-col items-start space-y-1 -mx-2">
                    {pathname !== routes.post({ id: itemCheck.id }) && (
                      <Link
                        to={routes.post({ id: itemCheck.id })}
                        className="flex items-center p-2 w-full rounded-md hover:bg-gray-100 hover:text-gray-900"
                      >
                        <FiExternalLink className="mr-2" />
                        View {filterAttr.singular.toLowerCase()} post page
                      </Link>
                    )}
                    {itemCheck.user.username === currentUser?.username && (
                      <>
                        <Link
                          to={routes.editPost({ id: itemCheck.id })}
                          className="flex items-center p-2 w-full rounded-md hover:bg-gray-100 hover:text-gray-900"
                        >
                          <FiEdit3 className="mr-2" />
                          Edit {filterAttr.singular.toLowerCase()} post
                        </Link>
                      </>
                    )}
                    {isAuthenticated && (
                      <Link
                        to={routes.report({ id: itemCheck.id })}
                        className="flex items-center p-2 w-full rounded-md hover:bg-gray-100 hover:text-gray-900"
                      >
                        <FiThumbsDown className="mr-2" />
                        Report {filterAttr.singular.toLowerCase()} post
                      </Link>
                    )}
                    {item.user.username === currentUser?.username && (
                      <>
                        <button
                          className="flex items-center p-2 w-full rounded-md text-red-600 hover:bg-gray-100"
                          onClick={onDeleteClick}
                        >
                          <FiTrash className="mr-2" />
                          Delete {item.type} post
                        </button>
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={repostVisible} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setRepostVisible(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className={`fixed inset-0 bg-${filterAttr.color}-200 bg-opacity-95`}
              />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div>
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Repost {filterAttr.singular.toLowerCase()}
                    </Dialog.Title>
                    <button
                      type="button"
                      className={`inline-flex justify-center p-2 text-sm font-medium text-gray-900 bg-gray-200 border border-transparent rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                      onClick={() => setRepostVisible(false)}
                    >
                      <FiX />
                    </button>
                  </div>
                  <div className="mt-4">
                    <NewPost
                      type="share"
                      setSharePost={setRepostVisible}
                      sharedPostId={itemCheck.id}
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default FeedItem
