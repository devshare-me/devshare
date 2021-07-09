import { useAuth } from '@redwoodjs/auth'
import { useParams, Redirect, routes } from '@redwoodjs/router'
import ContentNavigation from 'src/components/ContentNavigation'
import PostDialog from 'src/components/PostDialog'
import LoginButton from 'src/components/LoginButton'
import { filters, views } from 'src/utils/filters'

const HomeFeed = () => {
  const { isAuthenticated } = useAuth()
  const { view } = useParams()

  if (!isAuthenticated && view !== 'recent') {
    return <Redirect to={routes.home({ view: 'recent' })} />
  }

  return (
    <>
      <div className="mb-6">
        {!isAuthenticated ? (
          <div className="flex items-center justify-between flex-wrap gap-4 bg-yellow-100 shadow-sm p-6 rounded-xl">
            <div className="max-w-xs">
              <h2 className="text-3xl font-bold">Join other developers</h2>
              <p className="text-sm text-gray-600 mt-1">
                Sign up for a free account to curate your content and follow
                other devs!
              </p>
            </div>
            <LoginButton />
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">New Post</h2>
            <PostDialog />
          </>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      <div className="flex flex-col gap-2">
        <ContentNavigation navItems={views} query="view" />
        <ContentNavigation navItems={filters} query="filter" />
      </div>
    </>
  )
}

export default HomeFeed
