import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAuth } from '@redwoodjs/auth'
import {
  NavLink,
  Link,
  routes,
  SkipNavLink,
  SkipNavContent,
} from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import LoginButton from 'src/components/LoginButton'
import { FiUser, FiBookmark, FiSettings, FiLogOut } from 'react-icons/fi'
import '@reach/skip-nav/styles.css'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SkipNavLink contentId="main" />
      <Toaster />
      <header className="px-4 py-2 bg-white fixed top-0 w-full left-0 right-0 border-b border-gray-200 z-10 sm:px-8">
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
          <nav className="flex items-center">
            <Link to={routes.home()} className="font-bold text-xl">
              DevShare
            </Link>
          </nav>
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <nav className="flex items-center">
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
              <button onClick={openModal} className="rounded-btn ml-3">
                <FiLogOut />
                <span className="sr-only">Log out</span>
              </button>

              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed inset-0 z-10 overflow-y-auto"
                  onClose={closeModal}
                >
                  <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Dialog.Overlay className="fixed inset-0 bg-yellow-200 bg-opacity-95" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                      className="inline-block h-screen align-middle"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Log out
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to log out?
                          </p>
                        </div>

                        <div className="mt-4 flex items-center">
                          <button
                            type="button"
                            className="inline-flex justify-center mr-2 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-yellow-900 bg-yellow-100 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            onClick={logOut}
                          >
                            Log out
                          </button>
                        </div>
                      </div>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition>
            </nav>
          )}
        </div>
      </header>
      <SkipNavContent id="main" />
      <main className="flex-1 pt-20 pb-8 px-4 sm:px-8">{children}</main>
      <footer className="px-4 py-2 sm:px-8">
        <p className="max-w-5xl mx-auto w-full text-xs text-center text-gray-500">
          &copy; {new Date().getFullYear()}{' '}
          <Link to={routes.home()}>DevShare</Link>. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default DefaultLayout
