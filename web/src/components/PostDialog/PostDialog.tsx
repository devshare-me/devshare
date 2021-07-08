import { filters } from 'src/utils/filters'

const PostDialog = () => {
  const [postType, setPostType] = React.useState(filters[1].singular)

  return (
    <div className="bg-white rounded-xl w-full overflow-hidden shadow-sm">
      <div className="flex items-center">
        {filters.map(
          (type, i) =>
            type.singular && (
              <button
                key={i}
                onClick={() => setPostType(type.singular)}
                className={`${
                  type.singular === postType
                    ? `text-${type.color}-700 bg-${type.color}-100 border-${type.color}-700`
                    : 'border-gray-100'
                } flex flex-1 items-center justify-center font-semibold gap-1 px-4 py-4 border-b-2 border-solid text-xs md:text-sm`}
              >
                <type.icon />
                <span>{type.singular}</span>
              </button>
            )
        )}
      </div>
      <div className="p-6"></div>
    </div>
  )
}

export default PostDialog
