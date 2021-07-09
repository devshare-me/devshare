import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'
import ContentNavigation from 'src/components/ContentNavigation'
import PostDialog from 'src/components/PostDialog'
import UserFeedCell from 'src/components/UserFeedCell'
import { filters } from 'src/utils/filters'
import { RiGithubFill, RiTwitterFill } from 'react-icons/ri'
import { BiMapPin, BiGlobe } from 'react-icons/bi'

const User = ({ user }) => {
  const { currentUser, isAuthenticated } = useAuth()
  const { filter } = useParams()

  return (
    <div className="flex gap-8 flex-col lg:flex-row lg:items-start">
      <div className="flex flex-col items-center w-full bg-white shadow-sm rounded-xl p-4 lg:max-w-xs">
        {user.image && (
          <div className="w-32 h-32 shadow-sm rounded-full overflow-hidden">
            <img
              src={user.image}
              alt={user.name || '@' + user.username}
              className="object-cover"
            />
          </div>
        )}
        <h1 className="font-bold text-xl truncate">
          {user.name ? user.name : '@' + user.username}
        </h1>
        {user.name && (
          <p className="text-xs text-gray-500">{'@' + user.username}</p>
        )}
        {user.location && (
          <p className="text-sm flex items-center mt-4">
            <BiMapPin className="mr-1" /> {user.location}
          </p>
        )}
        {(user.github || user.twitter || user.website) && (
          <p className="text-xl flex items-center gap-2 mt-2">
            {user.github && (
              <a
                href={`https://github.com/${user.github}`}
                target="_blank"
                rel="noreferrer"
              >
                <RiGithubFill />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {user.twitter && (
              <a
                href={`https://twitter.com/${user.twitter}`}
                target="_blank"
                rel="noreferrer"
              >
                <RiTwitterFill />
                <span className="sr-only">Twitter</span>
              </a>
            )}
            {user.website && (
              <a href={user.website} target="_blank" rel="noreferrer">
                <BiGlobe />
                <span className="sr-only">Website</span>
              </a>
            )}
          </p>
        )}
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
  )
}

export default User
