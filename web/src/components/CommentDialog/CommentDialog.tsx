import { useAuth } from '@redwoodjs/auth'
import NewComment from 'src/components/Comment/NewComment'
import CommentsCell from 'src/components/Comment/CommentsCell'

const CommentDialog = ({ postId, count }) => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      {count > 0 && <CommentsCell postId={postId} count={count} />}
      {isAuthenticated && (
        <div className={`${count === 0 ? '-mt-6' : ''}`}>
          <NewComment postId={postId} />
        </div>
      )}
    </>
  )
}

export default CommentDialog
