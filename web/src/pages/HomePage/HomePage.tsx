import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import HomeFeed from 'src/components/HomeFeed'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <HomeFeed />

  return (
    <>
      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
    </>
  )
}

export default HomePage
