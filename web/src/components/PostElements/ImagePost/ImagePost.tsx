import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FiX } from 'react-icons/fi'

const ImagePost = ({ url = '' }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {url && (
        <>
          <button
            className="flex items-center justify-center bg-gray-800 w-full"
            onClick={() => setIsOpen(true)}
          >
            <img src={url} alt="" className="max-h-screen" />
          </button>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={() => setIsOpen(false)}
            >
              <div className="min-h-screen text-center">
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
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-95" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-flex items-center justify-center w-screen h-screen overflow-hidden text-left align-middle transition-all transform">
                    <button
                      type="button"
                      className={`inline-flex justify-center fixed top-2 right-2 p-2 text-sm font-semibold text-gray-900 bg-gray-200 border border-transparent rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                      onClick={() => setIsOpen(false)}
                    >
                      <FiX />
                      <span className="sr-only">Close dialog</span>
                    </button>
                    <div className="flex items-center justify-center bg-gray-800">
                      <img
                        src={url}
                        alt=""
                        className="max-h-screen max-w-screen h-auto w-auto"
                      />
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </>
  )
}

export default ImagePost
