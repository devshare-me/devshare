import { Private, Set, Router, Route } from '@redwoodjs/router'
import DefaultLayout from 'src/layouts/DefaultLayout'
import Wrapper from 'src/components/Wrapper'

const Routes = () => {
  return (
    <Router>
      <Set wrap={DefaultLayout}>
        <Set wrap={Wrapper} full={true}>
          <Route path="/u/{username}" page={UserUserPage} name="profile" />
        </Set>
        <Set wrap={Wrapper}>
          <Route path="/posts/{id}/edit" page={PostEditPostPage} name="editPost" />
          <Route path="/posts/{id}" page={PostPostPage} name="post" />
          <Private unauthenticated="home">
            <Route path="/report/{id}" page={ReportPage} name="settings" />
            <Route path="/settings" page={UserEditUserPage} name="settings" />
          </Private>
          <Route path="/" page={HomePage} name="home" />
        </Set>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
