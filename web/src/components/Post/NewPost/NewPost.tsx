import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes, useParams } from '@redwoodjs/router'
import PostForm from 'src/components/Post/PostForm'
import { QUERY } from 'src/components/UserFeedCell'

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    post: createPost(input: $input) {
      id
      type
    }
  }
`

const NewPost = ({ type, setType }) => {
  const { username } = useParams()
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: (data) => {
      setType('')
      toast.success(
        `${
          data.post.type.charAt(0).toUpperCase() + data.post.type.slice(1)
        } created`
      )
    },
    refetchQueries: [{ query: QUERY, variables: { username } }],
    awaitRefetchQueries: true,
  })

  const onSave = (input) => {
    createPost({ variables: { input } })
  }

  return (
    <PostForm onSave={onSave} loading={loading} error={error} type={type} />
  )
}

export default NewPost
