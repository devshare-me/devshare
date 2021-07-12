import UserCell from 'src/components/User/UserCell'
import { Helmet } from 'react-helmet'

const UserPage = ({ username }) => {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <UserCell username={username} />
    </>
  )
}

export default UserPage
