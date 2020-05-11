import React, {Component} from "react";
export default class LeagueSettings extends Component{
    render(){
        return(
            <div className="league-settings-panel">
                <div className="settings-section form-section">
                    <div className="settings-header">Co-owners</div>
                    <div className="coowner-button">
                        <button className="manage-owner-btn">Manage Co-owners</button>
                    </div>
                </div>

                <div className="settings-section form-section">
                    <div className="settings-header">League Settings
                        <div className="right-edit">
                            <i>Edit League</i>
                        </div>
                    </div>
                    <div className="settings-row-stack">
                        <div className="settings-name">Number of Teams</div>
                        <div className="settings-value">10</div>
                    </div>
                    <div className="settings-row-stack">
                        <div className="settings-name">Roster</div>
                        <div className="settings-value">2 DPS, 2 TNK, 2 SPT, 3 BN</div>
                    </div>
                    <div className="settings-row-stack">
                        <div className="settings-name">Draft Pick Trading Allowed</div>
                        <div className="settings-value">Yes</div>
                    </div>
                </div>

                
                <div className="settings-section form-section">
                    <div className="settings-header">Scoring Settings
                        <div className="right-edit">
                            <i>Edit Scoring</i>
                        </div>
                    </div>
                    <div className="grouping-header">Eliminations</div>
                    <div className="settings-row">
                        <div className="settings-name2">Placeholder</div>
                        <div className="settings-value2">
                            <span className="plus">test</span>
                        </div>
                    </div>
                    <div className="grouping-header">Objective Time</div>
                    <div className="settings-row">
                        <div className="settings-name2">Placeholder</div>
                        <div className="settings-value2">
                            <span className="plus">test</span>
                        </div>
                    </div>
                    <div className="grouping-header">Placeholder</div>
                    <div className="settings-row">
                        <div className="settings-name2">Placeholder</div>
                        <div className="settings-value2">
                            <span className="plus">test</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}