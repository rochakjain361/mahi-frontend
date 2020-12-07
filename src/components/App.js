import React, { useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from './Navbar'
import Main from './main'
import MainDetail from './mainDetail'
import Login from './auth/login'
import UpdateUser from './auth/updateUser'
import { getLoggedInUserInfo } from '../actions/AuthActions'
import AddComplaint from './addComplaint'
import Register from './auth/register'
import SignIn from './auth/signin'

function App () {
  const dispatch = useDispatch()
  const logged_in_user = useSelector(state => state.auth.Loggedinuser)
  useEffect(() => {
    if(!logged_in_user){
      dispatch(getLoggedInUserInfo())
    }
  }, [dispatch, logged_in_user])
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path={'/'} component={Main} />
          <Route exact path={'/add'} component={AddComplaint} />
          <Route exact path={'/login'} component={Login} />
          <Route exact path={'/update_user'} component={UpdateUser} />
          <Route exact path={'/register'} component={Register} />
          <Route exact path={'/sign_in'} component={SignIn} />
          <Route exact path={'/:id'} component={MainDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
