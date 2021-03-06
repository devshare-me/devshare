import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useParams, useLocation } from '@redwoodjs/router'
import PostForm from 'src/components/Post/PostForm'
import { QUERY as ProfileQuery } from 'src/components/UserFeedCell'
import { QUERY as RecentQuery } from 'src/components/RecentFeedCell'
import { QUERY as FollowingQuery } from 'src/components/FollowingFeedCell'

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    post: createPost(input: $input) {
      id
      type
    }
  }
`

const NewPost = ({
  type,
  setType = null,
  setSharePost = null,
  sharedPostId = null,
}) => {
  const { username, filter, view } = useParams()
  const { pathname } = useLocation()

  const refetchQuery = {
    query:
      view === 'recent'
        ? RecentQuery
        : pathname === '/'
        ? FollowingQuery
        : ProfileQuery,
    variables: { username, filter },
  }

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: (data) => {
      if (type === 'share') {
        setSharePost(false)
      } else {
        setType('')
      }
      localStorage.removeItem('DEVSHARE_SNIPPET')
      toast.success(
        `${
          data.post.type.charAt(0).toUpperCase() + data.post.type.slice(1)
        } created`
      )
    },
    refetchQueries: [refetchQuery],
    awaitRefetchQueries: true,
  })

  const onSave = (input) => {
    createPost({ variables: { input } })
  }

  return (
    <PostForm
      onSave={onSave}
      loading={loading}
      error={error}
      type={type}
      sharedPostId={sharedPostId}
    />
  )
}

export default NewPost
