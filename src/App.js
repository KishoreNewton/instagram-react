import React from "react"
import { Switch, Route } from 'react-router-dom'
import FeedPage from './pages/feed'
import ExplorePage from './pages/explore'
import ProfilePage from './pages/profile'
import PostPage from './pages/post'
import EditProfilePage from './pages/edit-profile'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import NotFoundPage from './pages/not-found'

function App() {
  return (
    <>    
      <Switch>
        <Route exact path="/" component={FeedPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route exact path="/:username" component={ProfilePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path="/accounts/login" component={LoginPage} />
        <Route exact path="/accounts/emailsignup" component={SignUpPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  )
}

export default App
