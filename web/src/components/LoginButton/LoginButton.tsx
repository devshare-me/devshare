import { useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { VscGithubInverted } from 'react-icons/vsc'

const LoginButton = () => {
  const { logIn } = useAuth()
  const { pathname } = useLocation()

  return (
    <button
      className="bg-gray-900 dark:bg-gray-300 text-gray-100 dark:text-gray-900 rounded-full px-3 py-2 flex items-center text-sm font-semibold transition-colors duration-300 hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-400"
      onClick={async () => {
        await logIn({
          provider: 'github',
          scopes: 'read:user',
          redirectTo: process.env.URL
            ? process.env.URL + pathname
            : 'http://localhost:8910' + pathname,
        })
      }}
    >
      <VscGithubInverted className="mr-2 text-xl" />
      <span>Login or Sign up</span>
    </button>
  )
}

export default LoginButton
