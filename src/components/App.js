import React, { useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'

import Main from './main'
import MainDetail from './mainDetail'
import Login from './auth/login'
import UpdateUser from './auth/updateProfile'
import { getLoggedInUserInfo, logout } from '../actions/AuthActions'
import AddComplaint from './addComplaint'
import Register from './auth/register'
import SignIn from './auth/signin'
import AboutUs from './aboutUs'
import NotFound from './notFound'
import ScrollToTop from './scrollToTop'

function App () {
  const dispatch = useDispatch()
  const logged_in_user = useSelector(state => state.auth.Loggedinuser)
  useEffect(() => {
    if (!logged_in_user) {
      dispatch(getLoggedInUserInfo())
    }
  }, [dispatch, logged_in_user])
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
      } else {
        if (logged_in_user) {
          dispatch(logout())
        }
        // No user is signed in.
      }
    })
  }, [dispatch, logged_in_user])
  return (
    <BrowserRouter>
      <ScrollToTop>
        <div>
          <Switch>
            <Route exact path={'/'} component={Main} />
            <Route exact path={'/add'} component={AddComplaint} />
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/update_user'} component={UpdateUser} />
            <Route exact path={'/register'} component={Register} />
            <Route exact path={'/sign_in'} component={SignIn} />
            <Route exact path={'/about_us'} component={AboutUs} />
            <Route exact path={'/:id'} component={MainDetail} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </ScrollToTop>
    </BrowserRouter>
  )
}

export default App
