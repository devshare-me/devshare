import { useLocation, Link } from '@redwoodjs/router'

const ContentNavigation = ({ navItems, query }) => {
  const { pathname, search } = useLocation()

  const params = new URLSearchParams(search)
  const term = params.get(query)

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
      <nav className="flex items-center flex-wrap mb-2">
        <Link
          to={setUrlParams()}
          className={`${
            term === null
              ? 'bg-gray-300 hover:bg-gray-200'
              : 'bg-gray-200 hover:bg-gray-300'
          } rounded-full flex items-center mr-2 px-3 py-1 font-semibold hover:text-gray-900 focus:ring-gray-500 text-xs md:text-sm`}
        >
          <firstItem.icon className="mr-1" />
          <span>{firstItem.name}</span>
        </Link>
        {navItems.slice(1).map((item, i: number) => (
          <Link
            key={i}
            to={setUrlParams(item.singular ? item.singular.toLowerCase() : '')}
            className={`${
              term === (item.singular ? item.singular.toLowerCase() : '')
                ? `bg-${item.color}-200 text-${item.color}-800`
                : 'bg-gray-200'
            } rounded-full flex items-center mr-2 px-3 py-1 font-semibold hover:bg-${
              item.color
            }-200 text-xs md:text-sm hover:text-${item.color}-800 focus:ring-${
              item.color
            }-500`}
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
