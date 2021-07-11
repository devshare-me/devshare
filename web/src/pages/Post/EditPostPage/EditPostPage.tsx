import EditPostCell from 'src/components/Post/EditPostCell'

const EditPostPage = ({ id }) => {
  return (
    <>
      <h1 className="font-bold text-2xl mb-8">Edit Post</h1>
      <EditPostCell id={id} />
    </>
  )
}

export default EditPostPage
