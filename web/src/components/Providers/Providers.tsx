import { useAuth } from '@redwoodjs/auth'

export const DarkModeContext = React.createContext({
  isDarkMode: true,
  setIsDarkMode: () => {},
})

export const DefaultTypeContext = React.createContext({
  defaultPostType: 'update',
  setDefaultPostType: () => {},
})

export const UserBookmarksContext = React.createContext({
  userBookmarks: [],
  setUserBookmarks: () => {},
})

const Providers = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth()

  const [isDarkMode, setIsDarkMode] = React.useState(true)
  const [defaultPostType, setDefaultPostType] = React.useState('update')
  const [userBookmarks, setUserBookmarks] = React.useState<
    string[] | undefined
  >([])

  React.useEffect(() => {
    if (isAuthenticated) {
      setIsDarkMode(currentUser.darkMode)
      setDefaultPostType(currentUser.defaultPostType)

      if (currentUser?.bookmarks.length > 0) {
        const bookmarkList = []
        const list = [...currentUser.bookmarks]

        for (let i = 0; i < list.length; i++) {
          const bookmark = list[i]
          bookmarkList.push(bookmark.postId)
        }

        setUserBookmarks(bookmarkList)
      }
    } else {
      setIsDarkMode(true)
      setDefaultPostType('update')
    }
  }, [isAuthenticated, currentUser])

  if (isDarkMode) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }

  const darkModeValue = { isDarkMode, setIsDarkMode }
  const postTypeValue = { defaultPostType, setDefaultPostType }
  const userBookmarksValue = { userBookmarks, setUserBookmarks }

  return (
    <DarkModeContext.Provider value={darkModeValue}>
      <DefaultTypeContext.Provider value={postTypeValue}>
        <UserBookmarksContext.Provider value={userBookmarksValue}>
          {children}
        </UserBookmarksContext.Provider>
      </DefaultTypeContext.Provider>
    </DarkModeContext.Provider>
  )
}

export default Providers
