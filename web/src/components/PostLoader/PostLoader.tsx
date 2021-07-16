import FeedWrapper from 'src/components/FeedWrapper'

const PostLoader = () => {
  return (
    <FeedWrapper>
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
    </FeedWrapper>
  )
}

const LoaderItem = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 w-full">
      <div className="animate-pulse space-y-2">
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-1/4" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-full" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-full" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-1/2" />
      </div>
    </div>
  )
}

export default PostLoader
