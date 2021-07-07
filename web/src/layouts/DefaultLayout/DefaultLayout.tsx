import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi'
import { VscGithubInverted } from 'react-icons/vsc'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated, logIn, logOut, currentUser } = useAuth()
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-8 py-2 gap-3 bg-white">
        <nav className="flex items-center gap-3">
          <Link to={routes.home()} className="font-bold text-xl">
            Title
          </Link>
        </nav>
        {!isAuthenticated ? (
          <button
            className="bg-gray-900 text-gray-100 rounded-full px-3 py-2 flex items-center text-sm font-semibold"
            onClick={async () => {
              await logIn({
                provider: 'github',
                scopes: 'read:user',
              })
            }}
          >
            <VscGithubInverted className="mr-2 text-xl" />
            <span>Log in / Sign up with GitHub</span>
          </button>
        ) : (
          <nav className="flex items-center gap-3">
            <Link
              to={routes.profile({ username: currentUser.username })}
              className="rounded-btn"
            >
              {currentUser.image ? (
                <img
                  src={currentUser.image}
                  alt={currentUser.name}
                  className="object-cover"
                />
              ) : (
                <FiUser />
              )}
              <span className="sr-only">Your Profile</span>
            </Link>
            <Link to="#" className="rounded-btn">
              <FiSettings />
              <span className="sr-only">Settings</span>
            </Link>
            <button onClick={logOut} className="rounded-btn">
              <FiLogOut />
              <span className="sr-only">Log out</span>
            </button>
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer></footer>
    </div>
  )
}

export default DefaultLayout
