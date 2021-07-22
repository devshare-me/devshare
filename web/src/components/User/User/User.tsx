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
      <div className="flex flex-col max-w-2xl mx-auto lg:flex-row lg:items-start lg:max-w-full">
        <div className="w-full mb-8 lg:sticky lg:top-20 lg:max-w-xs lg:mr-8 lg:mb-0">
          <ProfileItem user={user} />
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
