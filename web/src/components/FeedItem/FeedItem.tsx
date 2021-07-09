import { Link, routes } from '@redwoodjs/router'
import { filters } from 'src/utils/filters'
import { BiLock } from 'react-icons/bi'

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const FeedItem = ({ item }) => {
  const type = item.type

  const filter = filters.find(
    (x) => x.singular === type.charAt(0).toUpperCase() + type.slice(1)
  )

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-2 text-xs">
        <div className="flex items-center gap-2">
          <Link
            to={routes.profile({ username: item.user.username })}
            className="flex items-center"
          >
            {item.user?.image && (
              <div className="w-10 h-10 mr-2 overflow-hidden rounded-full">
                <img
                  src={item.user.image}
                  alt={item.user?.name || item.user.username}
                  className="content-cover"
                />
              </div>
            )}
            <span className="font-semibold text-base">
              {item.user?.name || '@' + item.user.username}
            </span>
          </Link>
          <span className="text-gray-600 text-xs">
            {timeTag(item.createdAt)}
          </span>
          {item.updatedAt && item.createdAt !== item.updatedAt && (
            <span>Edited</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          {item.private === true && <BiLock className="text-gray-600" />}
          <div
            className={`rounded-full p-2 font-semibold text-${filter.color}-700 bg-${filter.color}-100`}
          >
            <filter.icon />
          </div>
        </div>
      </div>
      {item.title && <h3 className="font-bold text-lg">{item.title}</h3>}
      {item.content && <p>{item.content}</p>}
    </div>
  )
}

export default FeedItem
