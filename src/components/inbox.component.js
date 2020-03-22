import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from './navbar.component'
export default class CreateLeague extends Component{
    render(){
        return(
            <div className="homePage">
                 <NavBar></NavBar>
                <div className="home-wrapper">
                    <div className="sideBar">
                        <div class="tab-side">
                            <Link to={"/home"} ><button class="tablinks-side" >Home</button></Link>
                            <Link to={"/create"}><button class="tablinks-side" >Leagues</button></Link>
                            <Link to={"/profile"}><button class="tablinks-side" >Profile</button></Link>
                            <Link to={"/inbox"}><button class="tablinks-side">Inbox</button></Link>   
                            <Link to={"/contact-us"}><button class="tablinks">Contact Us</button></Link>                   
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