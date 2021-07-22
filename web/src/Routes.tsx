import { Private, Set, Router, Route } from '@redwoodjs/router'
import DefaultLayout from 'src/layouts/DefaultLayout'
import Wrapper from 'src/components/Wrapper'

const Routes = () => {
  return (
    <Router>
      <Set wrap={DefaultLayout}>
        <Set wrap={Wrapper} full={true}>
          <Route path="/u/{username}" page={UserUserPage} name="profile" />
          <Route path="/stats" page={StatsPage} name="stats" />
          <Route path="/search" page={SearchPage} name="search" />
        </Set>
        <Set wrap={Wrapper}>
          <Route path="/posts/{id}/edit" page={PostEditPostPage} name="editPost" />
          <Route path="/posts/{id}" page={PostPostPage} name="post" />
          <Private unauthenticated="home">
            <Route path="/settings" page={UserEditUserPage} name="settings" />
            <Route path="/bookmarks" page={BookmarksPage} name="bookmarks" />
          </Private>
          <Route path="/report/{type}/{id}" page={ReportPage} name="report" />
          <Route path="/" page={HomePage} name="home" />
        </Set>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
