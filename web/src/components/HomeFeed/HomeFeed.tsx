import ContentNavigation from 'src/components/ContentNavigation'
import { filters, views } from 'src/utils/filters'

const HomeFeed = () => {
  const navItems = [{ name: 'Following', to: 'following' }]
  return (
    <>
      <div className="max-w-2xl w-full mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">Feed</h1>
        <div className="flex flex-col gap-2">
          <ContentNavigation navItems={views} query="view" />
          <ContentNavigation navItems={filters} query="filter" />
        </div>
      </div>
    </>
  )
}

export default HomeFeed
