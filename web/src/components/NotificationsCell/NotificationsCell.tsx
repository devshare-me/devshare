import type { NotificationsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'
import { FiMessageCircle, FiCornerUpRight, FiUserPlus } from 'react-icons/fi'
import NotificationItem from 'src/components/NotificationItem'

export const QUERY = gql`
  query NotificationsQuery {
    notifications {
      id
      type
      count
      read
      post {
        id
        type
      }
      follower {
        username
      }
      updatedAt
    }
  }
`

export const Loading = () => (
  <div className="px-2 py-4 text-center">Loading...</div>
)

export const Empty = () => (
  <div className="px-2 py-4 text-center">
    No notifications in the last 30 days
  </div>
)

export const Success = ({
  notifications,
}: CellSuccessProps<NotificationsQuery>) => {
  return (
    <ul className="text-sm">
      {notifications.map((item, i) => {
        return (
          <li
            key={item.id}
            className={`${
              notifications.length !== i + 1
                ? 'border-b border-gray-200 dark:border-gray-600 '
                : ''
            }`}
          >
            <NotificationItem notification={item} />
          </li>
        )
      })}
    </ul>
  )
}
