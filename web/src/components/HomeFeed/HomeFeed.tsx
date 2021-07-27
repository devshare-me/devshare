import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'
import ContentNavigation from 'src/components/ContentNavigation'
import PostDialog from 'src/components/PostDialog'
import LoginButton from 'src/components/LoginButton'
import FollowingFeedCell from 'src/components/FollowingFeedCell'
import RecentFeedCell from 'src/components/RecentFeedCell'
import { filters, views } from 'src/utils/filters'

const HomeFeed = () => {
  const { isAuthenticated, currentUser } = useAuth()
  const { view, filter } = useParams()

  const currentView =
    !isAuthenticated ||
    currentUser?.following?.length === 0 ||
    view === 'recent'
      ? 'recent'
      : view

  return (
    <>
      {!isAuthenticated ? (
        <div className="flex items-center justify-between flex-wrap bg-yellow-100 dark:bg-yellow-500 dark:bg-opacity-50 border border-gray-200 dark:border-gray-700 p-6 mb-6 rounded-xl">
          <div className="max-w-xs mr-4 my-4">
            <h2 className="text-3xl font-bold">Join other developers</h2>
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-1">
              Sign up for a free account to curate your content and follow other
              devs!
            </p>
          </div>
          <LoginButton />
        </div>
      ) : (
        <PostDialog />
      )}
      <h1 className="sr-only">Feed</h1>
      <div className="flex space-x-2 mb-6">
        <ContentNavigation
          navItems={views}
          query="view"
          current={currentView}
        />
        <ContentNavigation navItems={filters} query="filter" />
      </div>
      {currentView === 'recent' ? (
        <RecentFeedCell filter={filter} />
      ) : (
        <FollowingFeedCell filter={filter} />
      )}
    </>
  )
}

export default HomeFeed
