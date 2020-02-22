import React, {Component} from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component{
  
    render(){
        return(
            <div className ="homePage">
                <div className="sideBar">
                    <ul className="sideBar-list">
                        <div className="firstSide">
                             <li><Link className="home" to={"/home"}>Home</Link></li>
                        </div>
                        <div className="secondSide">
                            <li><Link className="inbox" to={"/inbox"}>Inbox</Link></li>
                        </div>
                        <div className="thirdSide">
                            <li><Link className="league" to={"/create"}>League</Link></li>
                        </div>
                        <div className="fourthSide">
                            <li><Link className="profile" to={"/profile"}>Profile</Link></li>
                        </div>
                        <div className="fifthSide">
                            <li><Link className="more" to={"/more"}>...More</Link></li>
                        </div>
                    </ul>
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

            
        );

    }
}