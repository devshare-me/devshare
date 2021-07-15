const ProfileLoader = () => {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
      <div className="animate-pulse space-y-2 w-full">
        <div className="bg-gray-200 dark:bg-gray-600 w-32 h-32 rounded-full mx-auto" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-1/2 mx-auto" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-3/4 mx-auto" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-1/2 mx-auto" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 w-1/4 mx-auto" />
      </div>
    </div>
  )
}

export default ProfileLoader
