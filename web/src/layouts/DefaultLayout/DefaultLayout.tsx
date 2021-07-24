import { useAuth } from '@redwoodjs/auth'
import {
  NavLink,
  Link,
  routes,
  SkipNavLink,
  SkipNavContent,
} from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import GithubProfile from 'src/components/GithubProfile'
import Modal from 'src/components/Modal'
import LoginButton from 'src/components/LoginButton'
import SearchForm from 'src/components/SearchForm'
import { Helmet } from 'react-helmet'
import { FiUser, FiBookmark, FiSettings, FiLogOut } from 'react-icons/fi'
import { VscGithubInverted } from 'react-icons/vsc'
import LogoFull from 'src/lib/logo.svg'
import LogoSmall from 'src/lib/logo-small.svg'
import '@reach/skip-nav/styles.css'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()

  const [isOpen, setIsOpen] = React.useState(false)

  const socialNav = [
    {
      title: 'GitHub',
      to: 'https://github.com/devshare-me/devshare',
      icon: VscGithubInverted,
    },
  ]

  const footerNav = [
    { title: 'Stats', to: routes.stats() },
    { title: 'Privacy', to: routes.privacy() },
  ]

  return (
    <>
      <GithubProfile />
      <div className="flex flex-col min-h-screen">
        <Helmet
          titleTemplate="%s | DevShare"
          defaultTitle="DevShare | An open-source, content sharing community for developers."
        />
        <SkipNavLink
          contentId="main"
          style={{ zIndex: 100 }}
          className="bg-gray-200 border border-gray-200 dark:bg-gray-800 dark:border-gray-600"
        />
        <Toaster
          toastOptions={{
            className:
              'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl',
          }}
        />
        <header className="px-4 py-2 bg-white dark:bg-gray-900 backdrop-filter backdrop-blur bg-opacity-75 dark:bg-opacity-75 fixed top-0 w-full left-0 right-0 border-b border-gray-200 dark:border-gray-800 z-10 sm:px-8">
          <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
            <Link to={routes.home()} className="font-bold text-xl mr-4">
              <span className="hidden sm:block">
                <LogoFull className="fill-current w-auto h-5" />
              </span>
              <span className="sm:hidden">
                <LogoSmall className="fill-current w-auto h-5" />
              </span>
              <span className="sr-only">DevShare</span>
            </Link>
            <nav className="flex items-center justify-end flex-1">
              <SearchForm />
              {isAuthenticated && (
                <>
                  <NavLink
                    to={routes.profile({ username: currentUser.username })}
                    className="rounded-btn ml-3"
                    activeClassName="active"
                  >
                    <FiUser />
                    <span className="sr-only">Your Profile</span>
                  </NavLink>
                  <NavLink
                    to={routes.bookmarks()}
                    className="rounded-btn ml-3"
                    activeClassName="active"
                  >
                    <FiBookmark />
                    <span className="sr-only">Your Bookmarks</span>
                  </NavLink>
                  <NavLink
                    to={routes.settings()}
                    className="rounded-btn ml-3"
                    activeClassName="active"
                  >
                    <FiSettings />
                    <span className="sr-only">Settings</span>
                  </NavLink>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-btn ml-3"
                  >
                    <FiLogOut />
                    <span className="sr-only">Log out</span>
                  </button>
                  <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Log out">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to log out?
                    </p>

                    <div className="mt-4 flex items-center">
                      <button
                        type="button"
                        className="inline-flex justify-center mr-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-yellow-900 bg-yellow-100 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        onClick={logOut}
                      >
                        Log out
                      </button>
                    </div>
                  </Modal>
                </>
              )}
            </nav>
            {!isAuthenticated && (
              <div className="ml-4">
                <LoginButton />
              </div>
            )}
          </div>
        </header>
        <SkipNavContent id="main" />
        <main className="flex-1 pt-20 pb-8 px-4 sm:px-8">{children}</main>
        <footer className="px-4 py-2 text-gray-500 sm:px-8">
          <nav className="flex items-center justify-center mb-2 text-lg">
            {socialNav.map((social, i) => (
              <a
                key={i}
                href={social.to}
                target="_blank"
                rel="noreferrer"
                className="mx-1"
              >
                <social.icon />
                <span className="sr-only">{social.title}</span>
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-center flex-wrap text-xs">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <Link to={routes.home()}>DevShare</Link>. All rights reserved.
            </p>
            <span className="ml-1">{' | '}</span>
            <nav className={`flex flex-wrap items-center`}>
              {footerNav.map((item, i) => (
                <Link key={i} to={item.to} className="mx-1">
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </>
  )
}

export default DefaultLayout
