import { useAuth } from '@redwoodjs/auth'
import { useParams, Link, routes } from '@redwoodjs/router'
import Modal from 'src/components/Modal'
import ContentNavigation from 'src/components/ContentNavigation'
import PostDialog from 'src/components/PostDialog'
import UserFeedCell from 'src/components/UserFeedCell'
import ProfileItem from 'src/components/ProfileItem'
import { filters } from 'src/utils/filters'
import { FiSettings, FiLogOut } from 'react-icons/fi'
import { Helmet } from 'react-helmet'

const User = ({ user }) => {
  const { currentUser, logOut } = useAuth()
  const { filter } = useParams()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Helmet>
        <title>
          {user.name ? `${user.name} (@${user.username})` : `@${user.username}`}
        </title>
      </Helmet>
      <div className="flex flex-col max-w-2xl mx-auto lg:flex-row lg:items-start lg:max-w-full">
        <div className="w-full mb-8 lg:sticky lg:top-20 lg:max-w-xs lg:mr-8 lg:mb-0">
          <ProfileItem user={user} />
          {currentUser?.username === user.username && (
            <div className="max-w-sm mt-2 mx-auto flex items-center justify-between flex-wrap text-sm text-gray-700 dark:text-gray-400">
              <Link to={routes.settings()} className="flex items-center">
                <FiSettings />
                <span className="ml-2">Settings</span>
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center"
              >
                <FiLogOut />
                <span className="ml-2">Log out</span>
              </button>
              <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Log out">
                <p className="text-sm text-gray-500">
                  Are you sure you want to log out?
                </p>

                <div className="mt-4 flex items-center">
                  <button
                    type="button"
                    className="inline-flex justify-center mr-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-yellow-900 dark:text-yellow-100 bg-yellow-200 dark:bg-yellow-600 dark:hover:bg-yellow-700 border border-transparent rounded-md transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-yellow-400"
                    onClick={logOut}
                  >
                    Log out
                  </button>
                </div>
              </Modal>
            </div>
          )}
        </div>
        <div className="flex-1">
          {currentUser?.username === user.username && <PostDialog />}
          <h2 className="sr-only">Feed</h2>
          <ContentNavigation navItems={filters} query="filter" />
          <UserFeedCell username={user.username} filter={filter} />
        </div>
      </div>
    </>
  )
}

export default User
