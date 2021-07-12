import { useAuth } from '@redwoodjs/auth'
import EditUserCell from 'src/components/User/EditUserCell'
import { Helmet } from 'react-helmet'

const EditUserPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <Helmet>
        <title>Edit Profile Settings</title>
      </Helmet>
      <h1 className="font-bold text-2xl mb-8">Edit Profile Settings</h1>
      <EditUserCell username={currentUser.username} />
    </>
  )
}

export default EditUserPage
