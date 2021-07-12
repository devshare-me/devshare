import { filters } from 'src/utils/filters'
import NewPost from 'src/components/Post/NewPost'

const PostDialog = () => {
  const [postType, setPostType] = React.useState('')

  function onPostTypeClick(type) {
    if (type.toLowerCase() === postType) {
      setPostType('')
    } else {
      setPostType(type.toLowerCase())
    }
  }

  return (
    <div className="bg-white rounded-xl w-full overflow-hidden border border-gray-200">
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
                    ? `bg-${type.color}-100 border-${type.color}-700`
                    : `border-gray-100`
                } flex flex-1 items-center justify-center text-${
                  type.color
                }-600 font-semibold px-4 py-4 border-b-2 border-solid text-lg bg-transparent md:text-sm transition-colors duration-300 hover:bg-${
                  type.color
                }-100`}
              >
                <type.icon />
                <span className="hidden md:block md:ml-1">{type.singular}</span>
              </button>
            )
        )}
      </div>
      {postType && (
        <div className="p-6">
          <NewPost type={postType} setType={setPostType} />
        </div>
      )}
    </div>
  )
}

export default PostDialog
