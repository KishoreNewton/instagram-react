import React, { useEffect, useRef, useContext } from "react"
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom'
import FeedPage from './pages/feed'
import ExplorePage from './pages/explore'
import ProfilePage from './pages/profile'
import PostPage from './pages/post'
import EditProfilePage from './pages/edit-profile'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import NotFoundPage from './pages/not-found'
import PostModal from './components/post/PostModal'
import { AuthContext } from "./auth"

function App() {
  const { authState } = useContext(AuthContext)
  const isAuth = authState.status === 'in'
  const history = useHistory()
  const location = useLocation()
  const previousLocation = useRef(location)
  const modal = location.state?.modal

  useEffect(() => {
    if(history.action !== 'POP' && !modal) {
      previousLocation.current = location
    }
  }, [location, modal, history.action])

  const isModalOpen = modal && previousLocation.current !== location

  if(!isAuth) {
    return (
      <Switch>
        <Route path="/accounts/login" component={LoginPage} />
        <Route exact path="/accounts/emailsignup" component={SignUpPage} /> 
        <Redirect to="/accounts/login" />
      </Switch>
    )
  }

  return (
    <>    
      <Switch location={isModalOpen ? previousLocation.current : location}>
        <Route exact path="/" component={FeedPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route exact path="/:username" component={ProfilePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path="/p/:postId" component={PostModal} />}
    </>
  )
}

export default App
