import Post from 'src/components/Post/Post'

export const QUERY = gql`
  query FindPostById($id: String!) {
    post: post(id: $id) {
      id
      type
      user {
        name
        image
        username
      }
      shares {
        id
      }
      title
      url
      content
      description
      private
      createdAt
      updatedAt
      sharedPost {
        id
        type
        user {
          name
          image
          username
        }
        shares {
          id
        }
        title
        url
        content
        description
        private
        createdAt
        updatedAt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Post not found</div>

export const Success = ({ post }) => {
  return <Post post={post} />
}
