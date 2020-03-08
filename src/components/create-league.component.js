import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import NavBar from './navbar.component'
export default class CreateLeague extends Component{
    constructor(props){
        super(props);
        //onSubmit function delcaration will handle submitting of form to the server
        this.onSubmit = this.onSubmit.bind(this);

        //functions for input fields that the user will modify
        this.onChangeLeagueName = this.onChangeLeagueName.bind(this);
        this.onChangeDraftPickTrading = this.onChangeDraftPickTrading.bind(this);
        this.onChangeScoringFormat = this.onChangeScoringFormat.bind(this);
        this.onChangeLeagueSize = this.onChangeLeagueSize.bind(this);
        this.onChangeLogo = this.onChangeLogo.bind(this);

        //setting default state of all variables
        this.state = {
            leaguename:' ',
            draftPickTrading: false,
            scoringFormat: 'STD',
            leagueSize: '4',
            logo: ' '
        };
    }

    onSubmit(e){
        e.preventDefault();

        const league = {
            leaguename: this.state.leaguename,
            draftPickTrading: this.state.draftPickTrading,
            scoringFormat: this.state.scoringFormat,
            leagueSize: this.state.leagueSize,
            logo: this.state.logo
        }

        console.log(league);

        axios.post('http://localhost:5000/league/create', league)
            .then(res => console.log(res.data));

        this.setState({ 
            leaguename:' ',
            draftPickTrading: false,
            scoringFormat: 'STD',
            leagueSize: '4',
        })
    }

    onChangeLeagueName(e){
        this.setState({
            leaguename: e.target.value
        })
    }

    onChangeDraftPickTrading(e){
        this.setState({
            draftPickTrading: e.target.value
        })
    }

    onChangeScoringFormat(e){
        this.setState({
            scoringFormat: e.target.value
        })
    }

    onChangeLeagueSize(e){
        this.setState({
            leagueSize: e.target.value
        })
    }

    onChangeLogo(e){
        this.setState({
            logo: e.target.value
        })
    }
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
                            <input type="text" className="league-name-text" placeholder="Enter the name of you league" value={this.state.leaguename} onChange={this.onChangeLeagueName}/>                        
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
                            </div>
                        </div>
                        <div className="scoringFormat">
                            <label>Scoring Format</label>
                            <br></br>
                            <input className="radio-scoring" type="radio" value="STD" name="scoring-format"/> STD
                            <br></br>
                            <input className="radio-scoring" type="radio" value="PPA" name="scoring-format"/> PPA
                            <br></br>
                            <input className="radio-scoring" type="radio" value="0.5 PPA" name="scoring-format"/> 0.5 PPA
                        </div>
                        <div className="allow-draft-trade">
                            <label>Allow Draft Picking Trading</label>
                            <br></br>
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <button type="submit" className="btn-createLeague" onSubmit={this.onSubmit}>Finish</button>
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