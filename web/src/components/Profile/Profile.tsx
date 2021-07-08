import ContentNavigation from 'src/components/ContentNavigation'
import PostDialog from 'src/components/PostDialog'
import { filters } from 'src/utils/filters'

const Profile = ({ user }) => {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto flex-col py-8 lg:flex-row">
      <div className="flex flex-col items-center w-full bg-white shadow-sm rounded-xl p-4 lg:max-w-xs">
        {user.image && (
          <div className="w-32 h-32 shadow-sm rounded-full overflow-hidden">
            <img
              src={user.image}
              alt={user.name || '@' + user.username}
              className="object-cover"
            />
          </div>
        )}
        <h1 className="font-bold text-xl truncate">
          {user.name ? user.name : '@' + user.username}
        </h1>
        {user.name && (
          <p className="text-xs text-gray-500">{'@' + user.username}</p>
        )}
        <div className=""></div>
      </div>
      <div className="flex-1">
        <div className="mb-6">
          <PostDialog />
        </div>
        <ContentNavigation navItems={filters} query="filter" />
      </div>
    </div>
  )
}

export default Profile
