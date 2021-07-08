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
      <nav className="flex items-center flex-wrap gap-2">
        <Link
          to={setUrlParams()}
          className={`${
            term === null
              ? 'bg-gray-300 hover:bg-gray-200'
              : 'bg-gray-200 hover:bg-gray-300'
          } rounded-full flex items-center gap-1 px-3 py-1 font-semibold hover:text-gray-900 focus:ring-gray-500 text-xs md:text-sm`}
        >
          <firstItem.icon />
          <span>{firstItem.name}</span>
        </Link>
        {navItems.slice(1).map((item, i: number) => (
          <Link
            key={i}
            to={setUrlParams(item.to)}
            className={`${
              term === item.to
                ? `bg-${item.color}-200 text-${item.color}-800`
                : 'bg-gray-200'
            } rounded-full flex items-center gap-1 px-3 py-1 font-semibold hover:bg-${
              item.color
            }-200 text-xs md:text-sm hover:text-${item.color}-800 focus:ring-${
              item.color
            }-500`}
          >
            {item.icon && <item.icon />}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}

export default ContentNavigation
