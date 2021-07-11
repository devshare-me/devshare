import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import UserForm from 'src/components/User/UserForm'

export const QUERY = gql`
  query FindUserByUsername($username: String!) {
    user: user(username: $username) {
      id
      email
      username
      name
      image
      location
      github
      twitter
      website
      createdAt
    }
  }
`
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      username
      name
      image
      location
      github
      twitter
      website
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ user }) => {
  const { currentUser } = useAuth()

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated')
      navigate(routes.profile({ username: currentUser.username }))
    },
  })

  const onSave = (input, id) => {
    updateUser({ variables: { id, input } })
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <UserForm user={user} onSave={onSave} error={error} loading={loading} />
    </div>
  )
}
