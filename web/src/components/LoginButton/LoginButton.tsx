import { useAuth } from '@redwoodjs/auth'
import { VscGithubInverted } from 'react-icons/vsc'

const LoginButton = () => {
  const { logIn } = useAuth()

  return (
    <button
      className="bg-gray-900 text-gray-100 rounded-full px-3 py-2 flex items-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      onClick={async () => {
        await logIn({
          provider: 'github',
          scopes: 'read:user',
        })
      }}
    >
      <VscGithubInverted className="mr-2 text-xl" />
      <span>Login or Sign up</span>
    </button>
  )
}

export default LoginButton
