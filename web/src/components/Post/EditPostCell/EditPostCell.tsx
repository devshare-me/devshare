import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import PostForm from 'src/components/Post/PostForm'

export const QUERY = gql`
  query FindEditPostById($id: String!) {
    post: post(id: $id) {
      id
      userId
      type
      title
      url
      content
      description
      private
      createdAt
      updatedAt
    }
  }
`
const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: String!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      userId
      type
      title
      url
      content
      description
      private
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ post }) => {
  const { currentUser } = useAuth()
  const [updatePost, { loading, error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post updated')
      navigate(routes.post({ id: post.id }))
    },
  })

  const onSave = (input, id) => {
    updatePost({ variables: { id, input } })
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {currentUser?.id !== post.userId ? (
        <p className="font-bold text-lg">
          You cannot edit a post that is not your own
        </p>
      ) : (
        <PostForm
          post={post}
          onSave={onSave}
          error={error}
          loading={loading}
          edit={true}
        />
      )}
    </div>
  )
}
