import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Landing from "./components/landing.component";
import Login from "./components/login.component";
import HomePage from "./components/homepage.component";
import ForgotPassword from './components/forgotpassword.component';
import Profile from './components/profile.component';
import CreateLeague from './components/create-league.component';
import Inbox from './components/inbox.component';
import Verify from './components/verify.component';
import {Provider} from "react-redux"
import store from "./store"

import PrivateRoute from "./components/private-route/PrivateRoute";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component{
  render() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/forgotpassword" component={ForgotPassword}/>
          <Switch>
            <PrivateRoute exact path="/home" component={HomePage}/>
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path ="/create" component={CreateLeague}/>
            <PrivateRoute exact path ="/inbox" component={Inbox}/>
            <PrivateRoute exact path ="/verify" component={Verify}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
}

export default App;
