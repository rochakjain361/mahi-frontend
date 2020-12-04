import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Navbar from './Navbar'
import Main from './main';
import MainDetail from './mainDetail'
import Login from './auth/login'
import UpdateUser from './auth/updateUser'


function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      <Switch>
        <Route exact path={'/'} component={Main} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/update_user'} component={UpdateUser} />
        <Route exact path={'/:id'} component={MainDetail} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
