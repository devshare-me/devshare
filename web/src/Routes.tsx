import { Private, Set, Router, Route } from '@redwoodjs/router'
import PostsLayout from 'src/layouts/PostsLayout'
import DefaultLayout from 'src/layouts/DefaultLayout'
import Wrapper from 'src/components/Wrapper'

const Routes = () => {
  return (
    <Router>
      <Set wrap={DefaultLayout}>
        <Route path="/posts/{id}" page={PostPage} name="post" />
        <Private unauthenticated="home">
          <Set wrap={Wrapper}>
            <Route path="/settings" page={UserEditUserPage} name="settings" />
          </Set>
        </Private>
        <Set wrap={Wrapper} full={true}>
          <Route path="/{username}" page={UserUserPage} name="profile" />
        </Set>
        <Set wrap={Wrapper}>
          <Route path="/" page={HomePage} name="home" />
        </Set>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
