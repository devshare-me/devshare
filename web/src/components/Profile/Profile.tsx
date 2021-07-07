import ContentNavigation from 'src/components/ContentNavigation'
import { filters } from 'src/utils/filters'

const Profile = ({ user }) => {
  return (
    <div className="flex gap-8 max-w-6xl p-8 mx-auto">
      <div className="flex flex-col items-center max-w-xs w-full bg-white shadow-sm rounded-xl p-4">
        {user.image && (
          <div className="w-36 h-36 shadow-sm rounded-full overflow-hidden">
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
          <p className="text-sm text-gray-500">{'@' + user.username}</p>
        )}
        <div className=""></div>
      </div>
      <div>
        <ContentNavigation navItems={filters} all="All" query="filter" />
      </div>
    </div>
  )
}

export default Profile
