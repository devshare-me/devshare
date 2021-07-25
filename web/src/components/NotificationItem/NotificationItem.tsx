import { useMutation } from '@redwoodjs/web'
import { routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import TimeTag from 'src/components/TimeTag'
import { FiMessageCircle, FiCornerUpRight, FiUserPlus } from 'react-icons/fi'

const READ_NOTIFICATION_MUTATION = gql`
  mutation ReadNotificationMutation($id: String!, $userId: String!) {
    readNotification(id: $id, userId: $userId) {
      id
    }
  }
`

const NotificationItem = ({ notification }) => {
  const { id, count, type, read, follower, post, updatedAt } = notification
  const link =
    type === 'follow'
      ? routes.profile({ username: follower.username })
      : routes.post({ id: post.id })

  const { currentUser } = useAuth()
  const [readNotification] = useMutation(READ_NOTIFICATION_MUTATION, {
    onCompleted: () => {
      navigate(link)
    },
  })

  const Icon =
    type === 'follow'
      ? FiUserPlus
      : type === 'comment'
      ? FiMessageCircle
      : FiCornerUpRight

  const message =
    type === 'follow' ? (
      <>
        <strong>@{follower.username}</strong> followed you
      </>
    ) : type === 'comment' ? (
      <>
        <strong>
          {count} comment{count > 1 && 's'}
        </strong>{' '}
        on your <strong>{post.type} post</strong>
      </>
    ) : (
      <>
        <strong>
          {count} share{count > 1 && 's'}
        </strong>{' '}
        on your <strong>{post.type} post</strong>
      </>
    )

  const markRead = (e) => {
    e.preventDefault()
    if (!read) {
      readNotification({ variables: { id: id, userId: currentUser.id } })
    } else {
      navigate(link)
    }
  }

  return (
    <a
      href={link}
      className={`p-3 flex items-center justify-between`}
      onClick={(e) => markRead(e)}
    >
      <span className="flex items-center">
        <Icon className="text-lg" aria-hidden="true" />
        <span className="ml-2">{message}</span>
      </span>

      <span className="ml-2 text-xs flex items-center">
        <TimeTag datetime={updatedAt} />
        {read === false && (
          <span
            className="ml-2 inline-flex h-1 w-1 rounded-full bg-yellow-500"
            aria-hidden="true"
          />
        )}
      </span>
    </a>
  )
}

export default NotificationItem
