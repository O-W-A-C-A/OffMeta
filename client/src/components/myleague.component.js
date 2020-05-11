import React, {Component} from "react";
export default class MyLeague extends Component{
    render(){
        return(
            <div className="my-league-panel">
                <div className="settings-section form-section">
                    <div className="my-league-header">League Members</div>
                   
                    <div className="matchup-header" style={{marginTop:'20px'}}>
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
                                </div>
                        </div>
                        <div className="my-league-div"></div>

                        <div className="matchup-header">
                        <div className="matchup-row">
                            <div className="matchup-owner">
                                {/*left user information*/}
                                <div className="left-matchup">
                                    <div className="left-matchup-container">
                                        <div className="name">Username</div>
                                        <div className="team-name">Team 3</div>
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
                                        <div className="team-name-flip">Team 4</div>
                                        <div className="description-flip">0-0</div>
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
                                </div>
                                
                        </div>
                        <div className="my-league-div"></div>
                    </div>
                </div>
                
            </div>

                <div className="settings-section form-section">
                    <div className="my-league-header" >
                        Standings
                        <div className="my-league-waiver">Waiver</div>
                        <div className="my-league-points-allowed">PA</div>
                        <div className="my-league-points-for">PF</div>  
                    </div>

                    <div className="league-standing-row">
                        <div className="rank">1</div>
                            <div className="team-container">
                                <div className="owner-av"></div>
                                <div className="team-owner-name">Username 1</div>
                                <div className="team-owner-desc">0-0</div>
                            </div>
                        <div className="points-for">0.0</div>
                        <div className="points-for">0.0</div>
                        <div className="waiver">1</div>
                    </div>
                    
                    <div className="league-standing-row">
                        <div className="rank">2</div>
                        <div className="team-container">
                            <div className="owner-av"></div>
                            <div className="team-owner-name">Username 2</div>
                            <div className="team-owner-desc">0-0</div>
                        </div>
                        <div className="points-for">0.0</div>
                        <div className="points-for">0.0</div>
                        <div className="waiver">2</div>
                    </div>

                    <div className="league-standing-row">
                        <div className="rank">3</div>
                        <div className="team-container">
                            <div className="owner-av"></div>
                            <div className="team-owner-name">Username 3</div>
                            <div className="team-owner-desc">0-0</div>
                        </div>
                        <div className="points-for">0.0</div>
                        <div className="points-for">0.0</div>
                        <div className="waiver">3</div>
                    </div>

                    <div className="league-standing-row">
                        <div className="rank">4</div>
                        <div className="team-container">
                            <div className="owner-av"></div>
                            <div className="team-owner-name">Username 4</div>
                            <div className="team-owner-desc">0-0</div>
                        </div>
                        <div className="points-for">0.0</div>
                        <div className="points-for">0.0</div>
                        <div className="waiver">4</div>
                    </div>
                </div>
            </div>
        );
    }
}