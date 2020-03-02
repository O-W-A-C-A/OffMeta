import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownButton } from "react-bootstrap";
export default class MatchUp extends Component{
    render(){
        return(
            <div className="matchup-panel">
                
                <div className="renew-matchup-header">
                </div>
                <div className="matchup-header">
                    <div className="matchup-row">

                        <div className="matchup-owner">
              
                            <div className="left-matchup">
                                <div className="left-container">
                                    <div className="name">
                                    <p>Username</p>
                                    </div>

                                    <div className="team-name">
                                        <p>Team 1</p>
                                    </div>
                                    <div className="description">
                                        <p>0-0</p>                                    
                                    </div>
                                </div>
                            </div>

                            <div className="score-and-projections">
                                <div className="score">
                                    <p>0.00</p>
                                </div>
                                <div className="projection">
                                    <p>0.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="label">
                            <p>VS</p>
                        </div>
                        <div className="matchup-owner-flip">
                        <div className="score-and-projections-flip">
                                <div className="score-flip">
                                    <p>0.00</p>
                                </div>
                                <div className="projection-flip">
                                    <p>0.00</p>
                                </div>
                            </div>
                            <div className="right-matchup">
                                <div className="name-flip">
                                <p>Username</p>
                                </div>

                                <div className="team-name-flip">
                                    <p>Team 2</p>
                                </div>
                                <div className="description-flip">
                                    <p>0-0</p>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="middle-div">
                        <div className="above-chance">
                            <div className="left-chance">
                                <p>50%</p>
                            </div>
                            <div className="middle-chance">
                                <p>Win%</p>
                            </div>
                            <div className="right-chance">
                                <p>50%</p>
                            </div>
                        </div>
                        <div className="win-chance-bar">
                            <div className="left-bar">
                                
                            </div>
                            <div className="right-bar">

                            </div>
                        </div>
                        <div className="remaining-players-container">
                            <div className="left-remaining">
                                <div className="left-container">
                                <p style={{margin: '0'}}>Yet to Play (0)</p>  
                                <p >None</p>  
                                </div>    
                            </div>
                            <div className="right-remaining">
                            <div className="right-container">
                                <p style={{margin: '0'}}>Yet to Play (0)</p>  
                                <div><p style={{paddingLeft:'40px'}}>None</p>  </div>
                                </div>  
                            </div>
                        </div>
                    </div>

                <div className="starters-section">
                    <div className="start-header-wrapper">
                        <div className="starter-header">
                            <p>Starters</p>
                        </div>
                        <div className="text">
                            
                        </div>
                    </div>

                    <div className="starter-container">
                            <div className="left-start">

                            </div>
                            <div className="middle-start">

                            </div>
                            <div className="right-start">

                            </div>
                        </div>
                        <div className="starter-container2">
                            <div className="left-start">

                            </div>
                            <div className="middle-start">

                            </div>
                            <div className="right-start">

                            </div>
                        </div>
                        <div className="starter-container3">
                            <div className="left-start">

                            </div>
                            <div className="middle-start">

                            </div>
                            <div className="right-start">

                            </div>
                        </div>
                        <div className="starter-container4">
                            <div className="left-start">

                            </div>
                            <div className="middle-start">

                            </div>
                            <div className="right-start">

                            </div>
                        </div>
                        <div className="starter-container5">
                            <div className="left-start">

                            </div>
                            <div className="middle-start">

                            </div>
                            <div className="right-start">

                            </div>
                        </div>
                        <div className="starter-container6">
                            <div className="left-start">

                            </div>
                            <div className="middle-start">

                            </div>
                            <div className="right-start">

                            </div>
                        </div>
                </div>
                <div className="bench-section">
                    <div className="bench-header-wrapper">
                     <div className="bench-header">
                       <p>Bench</p> 
                    </div>
                    </div> 
                    <div className="bench-container">
                            <div className="left-start">

                            </div>
                            <div className="middle-start">

                            </div>
                            <div className="right-start">

                            </div>
                    </div>
                    <div className="bench-container2">
                            <div className="left-start">

                            </div>
                            <div className="middle-start">

                            </div>
                            <div className="right-start">

                            </div>
                    </div>
                    <div className="bench-container3">
                            <div className="left-start">

                            </div>
                            <div className="middle-start">

                            </div>
                            <div className="right-start">

                            </div>
                    </div>
                                      
                </div>
            </div>
        );
    }
}