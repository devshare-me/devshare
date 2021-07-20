import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/FollowCell'

const CREATE_FOLLOW_MUTATION = gql`
  mutation CreateFollowMutation($userId: String!, $followId: String!) {
    createFollow(userId: $userId, followId: $followId) {
      id
    }
  }
`

const DELETE_FOLLOW_MUTATION = gql`
  mutation DeleteFollowMutation($userId: String!, $followId: String!) {
    removeFollow(userId: $userId, followId: $followId) {
      id
    }
  }
`

const FollowButton = ({ follows, userId, followId }) => {
  const followVariables = { userId, followId }
  const refetchQuery = {
    refetchQueries: [
      {
        query: QUERY,
        variables: followVariables,
      },
    ],
    awaitRefetchQueries: true,
  }

  const [createFollow, { loading, error }] = useMutation(
    CREATE_FOLLOW_MUTATION,
    {
      onCompleted: () => {
        toast.success('Following')
      },
      ...refetchQuery,
    }
  )

  const [removeFollow, { loadingRemove, errorRemove }] = useMutation(
    DELETE_FOLLOW_MUTATION,
    {
      onCompleted: () => {
        toast.success('Unfollowed')
      },
      ...refetchQuery,
    }
  )

  const onSave = () => {
    !loading &&
      !loadingRemove &&
      (follows
        ? removeFollow({
            variables: followVariables,
          })
        : createFollow({
            variables: followVariables,
          }))
  }

  return (
    <button
      disabled={loading || loadingRemove ? true : false}
      onClick={onSave}
      className={`${
        follows
          ? 'text-gray-900 bg-yellow-500 border-yellow-500'
          : 'text-yellow-600 dark:text-yellow-500 border-yellow-600 hover:bg-yellow-500 hover:bg-opacity-20 dark:hover:bg-yellow-500 dark:hover:bg-opacity-10'
      } w-full px-3 py-1 text-sm font-semibold rounded-full max-w-sm mx-auto mt-4 border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-300`}
    >
      {follows ? 'Following' : 'Follow'}
    </button>
  )
}

export default FollowButton
