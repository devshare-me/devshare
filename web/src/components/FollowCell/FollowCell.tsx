import type { FindFollowQuery } from 'types/graphql'
import type { CellSuccessProps } from '@redwoodjs/web'
import FollowButton from 'src/components/FollowButton'

export const QUERY = gql`
  query FindFollowQuery($userId: String!, $followId: String!) {
    checkFollow(userId: $userId, followId: $followId)
  }
`

export const Loading = () => <></>

export const Success = ({
  checkFollow,
  userId,
  followId,
}: CellSuccessProps<FindFollowQuery>) => {
  return (
    <FollowButton follows={checkFollow} userId={userId} followId={followId} />
  )
}
