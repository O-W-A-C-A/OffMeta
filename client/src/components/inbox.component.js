import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Home, Mail, Add, AccountBox} from '@material-ui/icons'
//components
import NavBar from './navbar.component'
export default class CreateLeague extends Component{
    render(){
        return(
            <div className="homePage">
                 <NavBar></NavBar>
                <div className="home-wrapper">
                    <div className="sideBar">
                    <div className="tab-side">
                        <Link to={"/home"} ><button className="tablinks-side"><Home className="side-icons"/>Home</button></Link>
                        <Link to={"/create"}><button className="tablinks-side"><Add className="side-icons"/>Leagues</button></Link>
                        <Link to={"/profile"}><button className="tablinks-side"><AccountBox className="side-icons"/>Profile</button></Link>
                        <Link to={"/inbox"}><button className="tablinks-side"><Mail className="side-icons"/>Inbox</button></Link>                    
                    </div>
                        
                    </div>
                    <div className="message-selection">
                        <div className="inbox-title">
                            <h4>Messages</h4>
                        </div>
                    </div>            
                    <div className="message-box">

                    </div>
                </div>
            </div>
        );
    }
}