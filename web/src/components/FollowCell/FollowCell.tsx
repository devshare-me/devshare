import type { FindFollowQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import FollowButton from 'src/components/FollowButton'

export const QUERY = gql`
  query FindFollowQuery($userId: String!, $followId: String!) {
    checkFollow(userId: $userId, followId: $followId)
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  checkFollow,
  userId,
  followId,
}: CellSuccessProps<FindFollowQuery>) => {
  return (
    <FollowButton follows={checkFollow} userId={userId} followId={followId} />
  )
}