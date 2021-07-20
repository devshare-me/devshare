import { Link, routes } from '@redwoodjs/router'
import TimeTag from 'src/components/TimeTag'

const UserPostDetails = ({ user, createdAt, updatedAt }) => {
  return (
    <div className="flex items-center">
      <Link
        to={routes.profile({ username: user.username })}
        className="flex items-center mr-2"
      >
        {user?.image && (
          <div className="w-10 h-10 mr-2 overflow-hidden rounded-full">
            <img
              src={user.image}
              alt={user?.name || user.username}
              className="content-cover"
            />
          </div>
        )}
        <span className="font-semibold text-base">
          {user?.name || '@' + user.username}
        </span>
      </Link>
      <span className="text-gray-600 dark:text-gray-400 text-xs">
        <TimeTag datetime={createdAt} />
      </span>
      {updatedAt && createdAt !== updatedAt && (
        <span className="text-gray-600 dark:text-gray-400 text-xs ml-2">
          Edited
        </span>
      )}
    </div>
  )
}

export default UserPostDetails
