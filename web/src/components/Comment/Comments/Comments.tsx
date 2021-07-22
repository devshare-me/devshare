import CommentItem from 'src/components/CommentItem'

const CommentsList = ({ comments, count, setCount }) => {
  return (
    <>
      {comments.map((comment, i) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          count={count}
          setCount={setCount}
          last={comments.length === i + 1}
        />
      ))}
    </>
  )
}

export default CommentsList
