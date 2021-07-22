import Modal from 'src/components/Modal'
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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} full={true}>
        <Form onSubmit={onSubmit}>
          <Label name="search" className="sr-only" errorClassName="sr-only">
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
      </Modal>
    </>
  )
}

export default SearchForm
