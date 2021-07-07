import { useLocation, Link } from '@redwoodjs/router'

const ContentNavigation = ({ navItems, query }) => {
  const { pathname, search } = useLocation()

  const params = new URLSearchParams(search)
  const term = params.get(query)
  const queryString = '?' + query + '='

  const firstItem = navItems[0]

  return (
    <nav className="flex items-center flex-wrap gap-2">
      <Link
        to={pathname}
        className={`${
          term === null
            ? 'bg-gray-300 hover:bg-gray-200'
            : 'bg-gray-200 hover:bg-gray-300'
        } rounded-full flex items-center gap-1 px-3 py-1 text-sm font-semibold hover:text-gray-900 focus:ring-gray-500`}
      >
        <firstItem.icon />
        <span>{firstItem.name}</span>
      </Link>
      {navItems.slice(1).map((item, i: number) => (
        <Link
          key={i}
          to={`${pathname}${item.to ? queryString + item.to : ''}`}
          className={`${
            term === item.to
              ? `bg-${item.color}-200 text-${item.color}-800`
              : 'bg-gray-200'
          } rounded-full flex items-center gap-1 px-3 py-1 text-sm font-semibold hover:bg-${
            item.color
          }-200 hover:text-${item.color}-800 focus:ring-${item.color}-500`}
        >
          {item.icon && <item.icon />}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  )
}

export default ContentNavigation
