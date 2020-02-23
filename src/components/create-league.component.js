import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from './navbar.component'
export default class CreateLeague extends Component{
    render(){
        return(
            
            <div className="homePage">
                <NavBar></NavBar>
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
                <div className="clContainer">
                    <div className="clWrapper">
                        <h3>Create a new league</h3>
                        <p>Don't worry you all be to make changes later to all settings later</p>
                        <div className="league-name">
                            <label>League Name</label>
                            <br></br>
                            <input type="leaguename" className="league-name-text" placeholder="Enter the name of you league" />                        
                        </div>
                        <div className="teams">
                            <label>League Size</label>
                            <div className="btn-group-teams">
                            <button className="btn-group-teams-sel">4 Teams</button>
                            <button className="btn-group-teams-sel">6 Teams</button>
                            <button className="btn-group-teams-sel">8 Teams</button>
                            <button className="btn-group-teams-sel">10 Teams</button>
                            </div>
                        </div>
                        <div className="scoringFormat">
                            <label>Scoring Format</label>
                            <br></br>
                            <input className="radio-scoring" type="radio" value="STD" name="scoring-format"/> STD
                            <br></br>
                            <input className="radio-scoring" type="radio" value="PPA" name="scoring-format"/> PPA
                            <br></br>
                            <input className="radio-scoring" type="radio" value="0.5 PPA" name="scoring-format"/> PPA
                        </div>
                        <div className="allow-draft-trade">
                            <label>Allow Draft Picking Trading</label>
                            <br></br>
                            <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div className="league-logo">
                            <label>Optional Logo</label>
                            <div className="logo-img">
                                <button type="upload" className="btn-upload-img"></button>
                            </div>
                        </div>
                        <button type="submit" className="btn-createLeague">Finish</button>
                    </div>
                </div>

            </div>
        );
    }
}