import { useAuth } from '@redwoodjs/auth'
import { useParams, Redirect, routes } from '@redwoodjs/router'
import ContentNavigation from 'src/components/ContentNavigation'
import PostDialog from 'src/components/PostDialog'
import LoginButton from 'src/components/LoginButton'
import RecentFeedCell from 'src/components/RecentFeedCell'
import { filters, views } from 'src/utils/filters'

const HomeFeed = () => {
  const { isAuthenticated, currentUser } = useAuth()
  const { view, filter } = useParams()

  if (
    (!isAuthenticated || currentUser.following.length === 0) &&
    view !== 'recent'
  ) {
    return <Redirect to={routes.home({ view: 'recent' })} />
  }

  return (
    <>
      <div className="mb-6">
        {!isAuthenticated ? (
          <div className="flex items-center justify-between flex-wrap bg-yellow-100 dark:bg-yellow-500 dark:bg-opacity-50 border border-gray-200 dark:border-gray-700 p-6 rounded-xl">
            <div className="max-w-xs mr-4 my-4">
              <h2 className="text-3xl font-bold">Join other developers</h2>
              <p className="text-sm text-gray-600 dark:text-gray-200 mt-1">
                Sign up for a free account to curate your content and follow
                other devs!
              </p>
            </div>
            <LoginButton />
          </div>
        ) : (
          <PostDialog />
        )}
      </div>
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      <div className="flex flex-col mb-4">
        <ContentNavigation navItems={views} query="view" />
        <ContentNavigation navItems={filters} query="filter" />
      </div>
      {view === 'recent' && <RecentFeedCell filter={filter} />}
    </>
  )
}

export default HomeFeed
