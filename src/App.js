import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Landing from "./components/landing.component";
import Login from "./components/login.component";
import Registration from "./components/registration.component";
import HomePage from "./components/homepage.component";
import ForgotPassword from './components/forgotpassword.component';
import Profile from './components/profile.component';
import CreateLeague from './components/create-league.component';
//import ImageUpload from './components/image-upload.component';

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/landing"} style={{color: '#fff'}}>OffMeta</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"} style={{color: '#fff'}}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/registration"} style={{color: '#fff'}}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     
          <Switch>
            <Route path="/landing" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/forgotpassword" component={ForgotPassword}/>
            <Route path="/home" component={HomePage} />
            <Route path="/profile" component={Profile} />
            <Route path ="/create" component={CreateLeague}/>
          </Switch>
    </div></Router>
  );
}
export default App;
