import CommentItem from 'src/components/CommentItem'

const CommentsList = ({ comments }) => {
  return (
    <>
      {comments.map((comment, i) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          last={comments.length === i + 1}
        />
      ))}
    </>
  )
}

export default CommentsList
