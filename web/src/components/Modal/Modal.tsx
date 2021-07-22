import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FiX } from 'react-icons/fi'
import { DarkModeContext } from 'src/layouts/DefaultLayout'

const Modal = ({
  isOpen = false,
  setIsOpen,
  title = '',
  color = 'gray',
  full = false,
  children,
}) => {
  const { isDarkMode } = React.useContext(DarkModeContext)
  const closeButtonRef = React.useRef(null)

  const CloseButton = ({ absolute = false }) => (
    <button
      ref={closeButtonRef}
      type="button"
      className={`${
        absolute ? 'fixed top-2 right-2 ' : ''
      }inline-flex justify-center p-2 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-600 border border-transparent rounded-full transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
      onClick={() => setIsOpen(false)}
    >
      <FiX />
      <span className="sr-only">Close dialog</span>
    </button>
  )

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`${
          isDarkMode ? 'dark ' : ''
        }fixed inset-0 z-10 overflow-y-auto`}
        onClose={() => setIsOpen(false)}
        initialFocus={closeButtonRef}
      >
        <div className={`${!full ? 'px-4 ' : ''}min-h-screen text-center`}>
          {full && (
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 z-50" />
            </Transition.Child>
          )}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={`fixed inset-0 bg-${color}-200 dark:bg-${color}-900 bg-opacity-95 dark:bg-opacity-95`}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          {!full && (
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
          )}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`${
                full
                  ? 'inline-flex items-center justify-center w-screen h-screen'
                  : 'inline-block w-full max-w-md p-6 my-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl'
              } overflow-hidden text-left align-middle transition-all transform`}
            >
              {title && (
                <div className="flex items-center justify-between">
                  <Dialog.Title as="h3" className="text-xl font-bold leading-6">
                    {title}
                  </Dialog.Title>
                  {!full && <CloseButton absolute={false} />}
                </div>
              )}
              {full && <CloseButton absolute={true} />}
              <div className={`${title ? 'mt-2' : ''}`}>{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
