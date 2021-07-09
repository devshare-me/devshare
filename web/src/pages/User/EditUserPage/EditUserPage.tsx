import { useAuth } from '@redwoodjs/auth'
import EditUserCell from 'src/components/User/EditUserCell'

const EditUserPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <h1 className="font-bold text-2xl mb-8">Edit Profile Settings</h1>
      <EditUserCell username={currentUser.username} />
    </>
  )
}

export default EditUserPage
