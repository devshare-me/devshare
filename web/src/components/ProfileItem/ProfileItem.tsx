import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import FollowCell from 'src/components/FollowCell'
import { RiGithubFill, RiTwitterFill } from 'react-icons/ri'
import { BiMapPin, BiGlobe } from 'react-icons/bi'

const ProfileItem = ({ user, link = false }) => {
  const { currentUser } = useAuth()
  const name = user.name ? user.name : '@' + user.username
  const imgClasses =
    'w-32 h-32 border-2 border-gray-200 dark:border-gray-600 rounded-full overflow-hidden'

  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
      {user.image && link ? (
        <Link
          to={routes.profile({ username: user.username })}
          className={imgClasses}
        >
          <img src={user.image} alt={name} className="object-cover" />
        </Link>
      ) : (
        user.image && (
          <div className={imgClasses}>
            <img src={user.image} alt={name} className="object-cover" />
          </div>
        )
      )}
      <h1 className="font-bold text-xl">
        {link ? (
          <Link to={routes.profile({ username: user.username })}>{name}</Link>
        ) : (
          <>{name}</>
        )}
      </h1>
      {user.name && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {'@' + user.username}
        </p>
      )}
      {user.location && (
        <p className="text-sm flex items-center mt-4">
          <BiMapPin className="mr-1" /> {user.location}
        </p>
      )}
      {(user.github || user.twitter || user.website) && (
        <p className="text-xl flex items-center mt-2">
          {user.github && (
            <a
              href={`https://github.com/${user.github}`}
              target="_blank"
              rel="noreferrer"
              className="mx-1"
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
              className="mx-1"
            >
              <RiTwitterFill />
              <span className="sr-only">Twitter</span>
            </a>
          )}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noreferrer"
              className="mx-1"
            >
              <BiGlobe />
              <span className="sr-only">Website</span>
            </a>
          )}
        </p>
      )}
      {currentUser?.username !== user.username && (
        <FollowCell userId={currentUser.id} followId={user.id} />
      )}
    </div>
  )
}

export default ProfileItem
