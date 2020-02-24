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
                    </div>
                </div>
                    <div className="clWrapper">
                       <div className="clContent"><h3>Create a new league</h3>
                        <p>Don't worry you all be to make changes later to all settings later</p>
                        
                        <div className="league-name">
                            <label>League Name</label>
                            <br></br>
                            <input type="leaguename" className="league-name-text" placeholder="Enter the name of you league" />                        
                        </div>
                        <div className="league-logo">
                            <label>Optional Logo</label>
                            <div className="logo-img">
                                <button type="upload" className="btn-upload-img"></button>
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
                        <button type="submit" className="btn-createLeague">Finish</button>
                    </div>
                    </div>
                </div>
                <div className="bar">

                </div>
                </div>
            </div>
        );
    }
}