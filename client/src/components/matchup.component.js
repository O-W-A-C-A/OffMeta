import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export default class MatchUp extends Component{
    render(){
        return(
            <div className="matchup-panel">
                
                <div className="renew-matchup-header">
                </div>
                <div className="matchup-header">
                    <div className="matchup-row">
                        <div className="matchup-owner">
                            {/*left user information*/}
                            <div className="left-matchup">
                                <div className="left-matchup-container">
                                    <div className="name">Username</div>
                                    <div className="team-name">Team 1</div>
                                    <div className="description">0-0</div>
                                </div>
                            </div>
                            {/*left user score projection*/}
                            <div className="score-and-projections">
                                <div className="score">0.00</div>
                                <div className="projection">0.00</div>
                            </div>
                        </div>

                        {/*VS Label*/}
                        <div className="vs-label">VS</div>
                        
                        {/*right user score projection*/}
                        <div className="matchup-owner-flip">
                            <div className="score-and-projections-flip">
                                <div className="score-flip">0.00</div>
                                <div className="projection-flip">0.00</div>
                            </div>

                            {/*right user information*/}
                            <div className="right-matchup">
                                <div className="right-matchup-container">
                                    <div className="name-flip">Username</div>
                                    <div className="team-name-flip">Team 2</div>
                                    <div className="description-flip">0-0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*user chance bar*/}
                <div className="middle-div">
                    <div className="above-chance">
                        <div className="left-chance">50%</div>
                        <div className="middle-chance">Win%</div>
                        <div className="right-chance">50%</div>
                    </div>
                    <div className="win-chance-bar">
                        <div className="left-bar"></div>
                        <div className="right-bar"></div>
                    </div>
                    <div className="remaining-players-container">
                        <div className="left-remaining">
                            <div className="left-container">
                                <div className= "yet-to-play" style={{margin: '0'}}>Yet to Play (0)</div>  
                                <div className="desc" style={{paddingRight:'40px'}}>None</div>
                            </div>    
                        </div>
                        <div className="right-remaining">
                            <div className="right-container">
                                <div className= "yet-to-play" style={{margin: '0'}}>Yet to Play (0)</div>  
                                <div className="desc" style={{paddingLeft:'40px'}}>None</div>
                            </div>  
                        </div>
                    </div>
                </div>

                {/*Starters Information*/}
                <div className="starters-section">
                    <div className="start-header-wrapper">
                        <div className="starter-header">Starters</div>
                        <div className="text">
                            
                        </div>
                    </div>

                    <div className="starter-container">
                            <div className="left-start">
                                <div className = "player-meta-left">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-score-container-left">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                            </div>

                            <div className="middle-start">
                                <div className="middle-text" style={{backgroundColor: '#FF2A6D'}}>DPS</div>
                            </div>

                            <div className="right-start">
                                <div className = "player-score-container-right">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-meta-right">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                            </div>
                        </div>
                        <div className="starter-container2">
                        <div className="left-start">
                                <div className = "player-meta-left">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-score-container-left">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                            </div>

                            <div className="middle-start">
                                <div className="middle-text" style={{backgroundColor: '#FF2A6D'}}>DPS</div>
                            </div>

                            <div className="right-start">
                                <div className = "player-score-container-right">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-meta-right">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                            </div>
                        </div>
                        <div className="starter-container3">
                        <div className="left-start">
                                <div className = "player-meta-left">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-score-container-left">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                            </div>

                            <div className="middle-start">
                                <div className="middle-text" style={{backgroundColor: '#00CEB8'}}>TNK</div>
                            </div>

                            <div className="right-start">
                                <div className = "player-score-container-right">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-meta-right">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                            </div>
                        </div>
                        <div className="starter-container4">
                        <div className="left-start">
                                <div className = "player-meta-left">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-score-container-left">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                            </div>

                            <div className="middle-start">
                                <div className="middle-text" style={{backgroundColor: '#00CEB8'}}>TNK</div>
                            </div>

                            <div className="right-start">
                                <div className = "player-score-container-right">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-meta-right">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                            </div>
                        </div>
                        <div className="starter-container5">
                        <div className="left-start">
                                <div className = "player-meta-left">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-score-container-left">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                            </div>

                            <div className="middle-start">
                                <div className="middle-text" style={{backgroundColor: '#58A7FF'}}>SPT</div>
                            </div>

                            <div className="right-start">
                                <div className = "player-score-container-right">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-meta-right">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                            </div>
                        </div>
                        <div className="starter-container6">
                        <div className="left-start">
                                <div className = "player-meta-left">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-score-container-left">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                            </div>

                            <div className="middle-start">
                                <div className="middle-text" style={{backgroundColor: '#58A7FF'}}>SPT</div>
                            </div>

                            <div className="right-start">
                                <div className = "player-score-container-right">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-meta-right">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                            </div>
                        </div>
                </div>
                {/*Bench Information*/}
                <div className="bench-section">
                    <div className="bench-header-wrapper">
                     <div className="bench-header">Bench</div>
                    </div> 
                    <div className="bench-container">
                    <div className="left-start">
                                <div className = "player-meta-left">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-score-container-left">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                            </div>

                            <div className="middle-start">
                                <div className="middle-text" style={{backgroundColor: '#FF2A6D'}}>DPS</div>
                            </div>

                            <div className="right-start">
                                <div className = "player-score-container-right">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-meta-right">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                            </div>
                    </div>
                    <div className="bench-container2">
                    <div className="left-start">
                                <div className = "player-meta-left">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-score-container-left">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                            </div>

                            <div className="middle-start">
                                <div className="middle-text" style={{backgroundColor: '#00CEB8'}}>TNK</div>
                            </div>

                            <div className="right-start">
                                <div className = "player-score-container-right">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-meta-right">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                            </div>
                    </div>
                    <div className="bench-container3">
                    <div className="left-start">
                                <div className = "player-meta-left">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-score-container-left">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                            </div>

                            <div className="middle-start">
                                <div className="middle-text" style={{backgroundColor: '#58A7FF'}}>SPT</div>
                            </div>

                            <div className="right-start">
                                <div className = "player-score-container-right">
                                    <div className = "player-score">0.00</div>
                                    <div className = "player-proj">0.00</div>
                                </div>
                                <div className="player-space"></div>
                                <div className = "player-meta-right">
                                    <div className = "player-name">Player 1</div>
                                    <div className = "player-desc">Desc</div>
                                </div>
                            </div>
                    </div>               
                </div>
            </div>
        );
    }
}