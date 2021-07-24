import { useLocation, Link } from '@redwoodjs/router'

const ContentNavigation = ({ navItems, query, current = null }) => {
  const { pathname, search } = useLocation()

  const params = new URLSearchParams(search)
  const term = params.get(query)
  const currentTerm = current ? current : term

  const firstItem = navItems[0]

  function setUrlParams(value?) {
    if (!value) {
      params.delete(query)
    } else {
      params.set(query, value)
    }

    const string = params.toString()

    let path = pathname

    if (string) path += '?' + string

    return path
  }

  return (
    <>
      <nav className="flex items-center flex-wrap mb-1 -mt-1">
        <Link
          to={setUrlParams()}
          className={`${
            currentTerm === null
              ? 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800'
              : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
          } rounded-full flex items-center mr-2 my-1 px-3 py-1 font-semibold hover:text-gray-900 dark:hover:text-gray-100 dark:focus:ring-offset-0 focus:ring-gray-500 text-sm`}
        >
          <firstItem.icon className="mr-1" />
          <span>{firstItem.name}</span>
        </Link>
        {navItems.slice(1).map((item, i: number) => (
          <Link
            key={i}
            to={setUrlParams(item.singular ? item.singular.toLowerCase() : '')}
            className={`${
              currentTerm === (item.singular ? item.singular.toLowerCase() : '')
                ? `bg-${item.color}-200 dark:bg-${item.color}-800 text-${item.color}-800 dark:text-${item.color}-200`
                : 'bg-gray-200 dark:bg-gray-800'
            } rounded-full flex items-center mr-2 my-1 px-3 py-1 font-semibold hover:bg-${
              item.color
            }-200 dark:hover:bg-${item.color}-800 text-sm hover:text-${
              item.color
            }-800 dark:hover:text-${item.color}-200 focus:ring-${
              item.color
            }-500 dark:focus:ring-offset-0`}
          >
            {item.icon && <item.icon className="mr-1" />}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}

export default ContentNavigation
