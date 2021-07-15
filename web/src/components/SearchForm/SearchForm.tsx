import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Form, Label, TextField } from '@redwoodjs/forms'
import { useParams, navigate, routes, useLocation } from '@redwoodjs/router'
import { FiSearch } from 'react-icons/fi'

const SearchForm = () => {
  const { q } = useParams()
  const { pathname } = useLocation()
  const [searchQuery, setSearchQuery] = React.useState(q || '')
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (pathname !== routes.search()) {
      setSearchQuery('')
    } else {
      setSearchQuery(q)
    }
  }, [pathname, q])

  const onSubmit = (data) => {
    navigate(routes.search({ q: data.search }))
    setIsOpen(false)
  }

  return (
    <>
      <Form onSubmit={onSubmit} className="flex-1 ml-4 hidden md:inline-flex">
        <Label name="search" className="sr-only" errorClassName="sr-only">
          Search
        </Label>
        <TextField
          name="search"
          value={searchQuery}
          className="bg-gray-100 dark:bg-gray-800 w-full border-0 rounded-full text-base py-2 px-4 focus:bg-gray-50 focus:bg-gray-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
          errorClassName="bg-gray-100 dark:bg-gray-800 w-full border-0 rounded-full text-base py-2 px-4 focus:bg-gray-50 focus:bg-gray-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
          placeholder="Search for users and posts..."
          onChange={(e) => setSearchQuery(e.target.value)}
          validation={{ required: true }}
        />
      </Form>
      <button
        className="rounded-btn ml-3 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FiSearch />
        <span className="sr-only">Search</span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
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
              <Dialog.Overlay className="fixed inset-0 bg-gray-200 dark:bg-gray-800 bg-opacity-95" />
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
              <div className="inline-block w-full max-w-2xl my-8 text-left align-middle transition-all transform">
                <Form onSubmit={onSubmit} className="flex-1">
                  <Label
                    name="search"
                    className="sr-only"
                    errorClassName="sr-only"
                  >
                    Search
                  </Label>
                  <TextField
                    name="search"
                    value={searchQuery}
                    className="bg-gray-100 w-full border-0 rounded-full text-base py-2 px-4 border-2 border-gray-300 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                    errorClassName="rw-input text-lg font-bold rw-input-error"
                    placeholder="Search for users and posts..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    validation={{ required: true }}
                  />
                </Form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default SearchForm
