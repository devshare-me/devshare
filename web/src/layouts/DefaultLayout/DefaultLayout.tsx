import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { NavLink, Link, routes } from '@redwoodjs/router'
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi'
import { VscGithubInverted } from 'react-icons/vsc'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated, logIn, logOut, currentUser } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-8 py-2 gap-3 bg-white">
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
          <nav className="flex items-center gap-3">
            <Link to={routes.home()} className="font-bold text-xl">
              Title
            </Link>
          </nav>
          {!isAuthenticated ? (
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
          ) : (
            <nav className="flex items-center gap-3">
              <NavLink
                to={routes.profile({ username: currentUser.username })}
                className="rounded-btn"
                activeClassName="active"
              >
                <FiUser />
                <span className="sr-only">Your Profile</span>
              </NavLink>
              <Link to="#" className="rounded-btn">
                <FiSettings />
                <span className="sr-only">Settings</span>
              </Link>
              <button onClick={openModal} className="rounded-btn">
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
                      <Dialog.Overlay className="fixed inset-0 bg-gray-100 bg-opacity-95" />
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

                        <div className="mt-4 flex items-center gap-2">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-yellow-900 bg-yellow-100 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500"
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
      <main className="flex-1 px-8">{children}</main>
      <footer></footer>
    </div>
  )
}

export default DefaultLayout
