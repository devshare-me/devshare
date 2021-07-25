import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FiBell } from 'react-icons/fi'
import NotificationsCell from 'src/components/NotificationsCell'

const NotificationButton = () => {
  return (
    <>
      <Popover className="md:relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'active ' : ''}rounded-btn ml-3`}
            >
              <FiBell />
              <span className="sr-only">Your Notifications</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen px-4 mt-4 top-full right-0 md:w-96 md:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="relative grid gap-8 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 flex-1 border border-gray-200 dark:border-gray-600 overflow-hidden rounded-xl">
                    <NotificationsCell />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

export default NotificationButton
