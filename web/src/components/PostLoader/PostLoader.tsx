const PostLoader = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
    </div>
  )
}

const LoaderItem = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 w-full">
      <div className="animate-pulse space-y-2">
        <div className="bg-gray-200 rounded-md p-2 w-1/4" />
        <div className="bg-gray-200 rounded-md p-2 w-full" />
        <div className="bg-gray-200 rounded-md p-2 w-full" />
        <div className="bg-gray-200 rounded-md p-2 w-1/2" />
      </div>
    </div>
  )
}

export default PostLoader
