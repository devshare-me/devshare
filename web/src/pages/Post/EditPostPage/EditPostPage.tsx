import EditPostCell from 'src/components/Post/EditPostCell'
import { Helmet } from 'react-helmet'

const EditPostPage = ({ id }) => {
  return (
    <>
      <Helmet>
        <title>Edit Post</title>
      </Helmet>
      <h1 className="font-bold text-2xl mb-8">Edit Post</h1>
      <EditPostCell id={id} />
    </>
  )
}

export default EditPostPage
