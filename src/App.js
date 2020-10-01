<<<<<<< HEAD
import React, { useEffect, useRef, useContext, createContext } from "react"
=======
import React, { useEffect, useRef, useContext } from "react"
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
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
<<<<<<< HEAD
import { useSubscription } from '@apollo/react-hooks'
import LoadingScreen from './components/shared/LoadingScreen'
import { ME } from './graphql/subscriptions'

export const UserContext = createContext()
=======
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d

function App() {
  const { authState } = useContext(AuthContext)
  const isAuth = authState.status === 'in'
<<<<<<< HEAD
  const userId = isAuth ? authState.user.uid : null
  const variables = { userId }
  const { data, loading } = useSubscription(ME, { variables })
=======
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
  const history = useHistory()
  const location = useLocation()
  const previousLocation = useRef(location)
  const modal = location.state?.modal

  useEffect(() => {
<<<<<<< HEAD
    if(history.action !== 'POP' && !modal) { 
=======
    if(history.action !== 'POP' && !modal) {
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
      previousLocation.current = location
    }
  }, [location, modal, history.action])

<<<<<<< HEAD
  if (loading) return <LoadingScreen />
=======
  const isModalOpen = modal && previousLocation.current !== location
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d

  if(!isAuth) {
    return (
      <Switch>
        <Route path="/accounts/login" component={LoginPage} />
        <Route exact path="/accounts/emailsignup" component={SignUpPage} /> 
        <Redirect to="/accounts/login" />
      </Switch>
    )
  }

<<<<<<< HEAD
  const isModalOpen = modal && previousLocation.current !== location
  const me = isAuth && data ? data.users[0] : null
  const currentUserId = me.id

  return (
    <UserContext.Provider value={{me, currentUserId }}>    
=======
  return (
    <>    
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
      <Switch location={isModalOpen ? previousLocation.current : location}>
        <Route exact path="/" component={FeedPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route exact path="/:username" component={ProfilePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path="/p/:postId" component={PostModal} />}
<<<<<<< HEAD
    </UserContext.Provider>
=======
    </>
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
  )
}

export default App
