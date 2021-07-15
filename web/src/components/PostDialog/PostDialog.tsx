import { filters } from 'src/utils/filters'
import NewPost from 'src/components/Post/NewPost'
import { DefaultTypeContext } from 'src/layouts/DefaultLayout'

const PostDialog = () => {
  const { defaultPostType } = React.useContext(DefaultTypeContext)
  const [postType, setPostType] = React.useState(defaultPostType)

  function onPostTypeClick(type) {
    if (type.toLowerCase() === postType) {
      setPostType('')
    } else {
      setPostType(type.toLowerCase())
    }
  }

  return (
    <>
      <div className="post-dialog bg-white dark:bg-gray-800 rounded-xl w-full overflow-hidden border border-gray-200 dark:border-gray-600">
        <div className="flex items-center">
          {filters.map(
            (type, i) =>
              type.singular && (
                <button
                  key={i}
                  onClick={() => onPostTypeClick(type.singular)}
                  className={`${
                    !postType
                      ? 'border-transparent'
                      : type.singular.toLowerCase() === postType
                      ? `bg-${type.color}-100 dark:bg-${type.color}-800 dark:bg-opacity-50 border-${type.color}-700`
                      : `border-gray-100 dark:border-gray-700`
                  } flex flex-1 items-center justify-center text-${
                    type.color
                  }-600 dark:text-${
                    type.color
                  }-300 font-semibold px-4 py-4 border-b-2 border-solid text-lg bg-transparent md:text-sm transition-colors duration-300 hover:bg-${
                    type.color
                  }-100 dark:hover:bg-${
                    type.color
                  }-800 dark:hover:bg-opacity-50`}
                >
                  <type.icon />
                  <span className="hidden md:block md:ml-1">
                    {type.singular}
                  </span>
                </button>
              )
          )}
        </div>
        {postType && <NewPost type={postType} setType={setPostType} />}
      </div>
      <hr className="my-8" />
    </>
  )
}

export default PostDialog
