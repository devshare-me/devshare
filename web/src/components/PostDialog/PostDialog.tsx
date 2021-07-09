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
    <div className="bg-white rounded-xl w-full overflow-hidden shadow-sm">
      <div className="flex items-center">
        {filters.map(
          (type, i) =>
            type.singular && (
              <button
                key={i}
                onClick={() => onPostTypeClick(type.singular)}
                className={`${
                  !postType
                    ? ''
                    : type.singular.toLowerCase() === postType
                    ? `text-${type.color}-700 bg-${type.color}-100 border-${type.color}-700`
                    : 'border-gray-100'
                } flex flex-1 items-center justify-center font-semibold gap-1 px-4 py-4 border-b-2 border-solid text-lg md:text-sm`}
              >
                <type.icon />
                <span className="hidden md:block">{type.singular}</span>
              </button>
            )
        )}
      </div>
      {postType && (
        <div className="p-6">
          <NewPost type={postType} />
        </div>
      )}
    </div>
  )
}

export default PostDialog
