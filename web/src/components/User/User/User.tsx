import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'
import ContentNavigation from 'src/components/ContentNavigation'
import PostDialog from 'src/components/PostDialog'
import UserFeedCell from 'src/components/UserFeedCell'
import ProfileItem from 'src/components/ProfileItem'
import { filters } from 'src/utils/filters'
import { Helmet } from 'react-helmet'

const User = ({ user }) => {
  const { currentUser } = useAuth()
  const { filter } = useParams()

  return (
    <>
      <Helmet>
        <title>
          {user.name ? `${user.name} (@${user.username})` : `@${user.username}`}
        </title>
      </Helmet>
      <div className="flex flex-col lg:flex-row lg:items-start">
        <div className="w-full mb-8 lg:sticky lg:top-20 lg:max-w-xs lg:mr-8 lg:mb-0">
          <ProfileItem user={user} />
        </div>
        <div className="flex-1">
          {currentUser?.username === user.username && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">New Post</h2>
              <PostDialog />
            </div>
          )}
          <h2 className="text-xl font-bold mb-2">Feed</h2>
          <ContentNavigation navItems={filters} query="filter" />
          <UserFeedCell username={user.username} filter={filter} />
        </div>
      </div>
    </>
  )
}

export default User
