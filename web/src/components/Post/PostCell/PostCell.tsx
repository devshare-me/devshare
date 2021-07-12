import Post from 'src/components/Post/Post'
import { feedQuery } from 'src/utils/feedQuery'

export const QUERY = gql`
  query FindPostById($id: String!) {
    post: post(id: $id) {
      ${feedQuery}
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Post not found</div>

export const Success = ({ post }) => {
  return <Post post={post} />
}
