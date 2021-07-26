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
import LoginButton from 'src/components/LoginButton'
import SearchForm from 'src/components/SearchForm'
import { Helmet } from 'react-helmet'
import { FiUser, FiBookmark, FiSettings } from 'react-icons/fi'
import NotificationButton from 'src/components/NotificationButton'
import { VscGithubInverted, VscTwitter } from 'react-icons/vsc'
import LogoFull from 'src/lib/logo.svg'
import LogoSmall from 'src/lib/logo-small.svg'
import packageJson from '../../../package.json'
import '@reach/skip-nav/styles.css'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated, currentUser } = useAuth()

  const socialNav = [
    {
      title: 'GitHub',
      to: 'https://github.com/devshare-me/devshare',
      icon: VscGithubInverted,
    },
    {
      title: 'Twitter',
      to: 'https://twitter.com/devshare_me',
      icon: VscTwitter,
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
                  <NotificationButton />
                  <NavLink
                    to={routes.settings()}
                    className="rounded-btn ml-3"
                    activeClassName="active"
                  >
                    <FiSettings />
                    <span className="sr-only">Settings</span>
                  </NavLink>
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
                className="mx-2"
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
            <span className="mr-1">{' | '}</span>
            <p>
              <a
                href={`https://github.com/devshare-me/devshare/releases/tag/v${packageJson.version}`}
                target="_blank"
                rel="noreferrer"
              >{`v${packageJson.version}`}</a>
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default DefaultLayout
