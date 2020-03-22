import React, {Component} from "react";
import { Link } from "react-router-dom";
import NavBar from './navbar.component'
export default class HomePage extends Component{
  
    render(){
        return(
            <div className ="homePage">
                <NavBar></NavBar>
                <div className="home-wrapper">
                <div className="sideBar">
                    <div class="tab-side">
                        <Link to={"/home"} ><button class="tablinks-side" >Home</button></Link>
                        <Link to={"/create"}><button class="tablinks" >Leagues</button></Link>
                        <Link to={"/profile"}><button class="tablinks" >Profile</button></Link>
                        <Link to={"/inbox"}><button class="tablinks">Inbox</button></Link> 
                        <Link to={"/contact-us"}><button class="tablinks">Contact Us</button></Link>                   
                    </div>
                </div>
                
                <div className="main-content">
                
                    <div class="tab">
                        <button class="tablinks" onclick="openTab(event, 'Matchup')">Matchup</button>
                        <button class="tablinks" onclick="openTab(event, 'My Team')">My Team</button>
                        <button class="tablinks" onclick="openTab(event, 'League')">League</button>
                        <button class="tablinks" onclick="openTab(event, 'Settings')">Settings</button>                    
                    </div>
                    <div id="Matchup" class="tabcontent">
                    <h3>Matchup</h3>
                    <p>you are in Matchup</p>
                    </div>

                    <div id="MyTeam" class="tabcontent">
                    <h3>MyTeam</h3>
                    <p>you are in my team</p>
                    </div>

                    <div id="League" class="tabcontent">
                    <h3>League</h3>
                    <p>you are in league</p>
                    </div> 

                    <div id="Settings" class="tabcontent">
                    <h3>Settings</h3>
                    <p>you are in settings</p>
                    </div> 
                </div>

                <div className="side-chat">

                </div>
                </div>
            </div>

            
        );

    }
}