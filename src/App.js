import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Landing from "./components/landing.component";
import Login from "./components/login.component";
import HomePage from "./components/homepage.component";
import ForgotPassword from './components/forgotpassword.component';
import Profile from './components/profile.component';
import CreateLeague from './components/create-league.component';
import Inbox from './components/inbox.component';
//import ImageUpload from './components/image-upload.component';
import Verify from './components/verify.component';
import AboutUs from './components/about-us.component';
import ContactUs from './components/contact-us.component';
import Invite from './components/invite.component';

function App() {
  return (
  <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/forgotpassword" component={ForgotPassword}/>
            <Route path="/home" component={HomePage} />
            <Route path="/profile" component={Profile} />
            <Route path ="/create" component={CreateLeague}/>
            <Route path ="/inbox" component={Inbox}/>
            <Route path ="/verify" component={Verify}/>
            <Route path ="/about-us" component={AboutUs}/>
            <Route path ="/contact-us" component={ContactUs}/>
            <Route path ="/invite" component={Invite} />
          </Switch>
   
    </Router>
  );
}
export default App;
