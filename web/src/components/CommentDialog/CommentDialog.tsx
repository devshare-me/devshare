import { useAuth } from '@redwoodjs/auth'
import NewComment from 'src/components/Comment/NewComment'
import CommentsCell from 'src/components/Comment/CommentsCell'

const CommentDialog = ({ postId, count, setCount }) => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <CommentsCell postId={postId} count={count} setCount={setCount} />
      {isAuthenticated && (
        <div className={`${count === 0 ? '-mt-6' : ''}`}>
          <NewComment postId={postId} count={count} setCount={setCount} />
        </div>
      )}
    </>
  )
}

export default CommentDialog
