import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

//components
import Landing from './components/landing.component';
import Login from './components/login.component';
import HomePage from './components/homepage.component';
import ForgotPassword from './components/forgotpassword.component';
import ResetPassword from './components/resetpassword.component';
import Profile from './components/profile.component';
import CreateLeague from './components/create-league.component';
import Verify from './components/verify.component';
import CreateOrJoinLeague from './components/create-or-joinleague.component';
import PreDraft from './components/pre-draft.component';
import AcceptInvite from './components/accept-invite.component';
import store from './store';

import PrivateRoute from './components/private-route/PrivateRoute';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser()); // Redirect to login
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Route exact path='/' component={Landing} />
            <Route path='/login' component={Login} />
            <Route path='/forgotpassword' component={ForgotPassword} />
            <Route path='/reset/:token' component={ResetPassword} />
            <Route path='/acceptinvite/:token' component={AcceptInvite} />
            <Switch>
              <PrivateRoute exact path='/home/:id' component={HomePage} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/create' component={CreateLeague} />
              <PrivateRoute exact path='/verify' component={Verify} />
              <PrivateRoute
                exact
                path='/getstarted'
                component={CreateOrJoinLeague}
              />
              <PrivateRoute exact path='/pre-draft' component={PreDraft} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
