import React, { Component } from "react";
import axios from 'axios';
//components
import NavBar from './basic-navbar.component';
//auth
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreateOrJoinLeague extends Component{
    constructor(props){
        super(props);

        //onSubmit function delcaration will handle submitting of form to the server
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitCode = this.onSubmitCode.bind(this);//this is for if the user want to join by code

        //function declaration for input fields that the user will modify
        this.onChangeLeagueName = this.onChangeLeagueName.bind(this);
        this.onChangeScoringFormat = this.onChangeScoringFormat.bind(this);
        this.onChangeLeagueSize = this.onChangeLeagueSize.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);

        this.state = {
            leagueName:'',
            scoringFormat: 'STD',
            leagueSize: 4,
            createdBy:'',
            joinCode:'',
            playerdatabase:''
        }
    }

    componentDidMount(){
        let playerDB = this.player2db();
        this.setState({
            playerdatabase: playerDB
        })
    }

    onSubmit(e){
        //prevents autoload of page
        e.preventDefault();
        //this.state.playerdatabase = playerDB
        const league = new FormData();
        league.append('leagueName', this.state.leagueName);
        league.append('scoringFormat', this.state.scoringFormat);
        league.append('leagueSize', this.state.leagueSize);
        league.append('createdBy', this.props.auth.user.id);
        league.append('playerdatabase', this.state.playerdatabase);
        //prints to console league information
        console.log(league);
        console.log(this.state.playerdatabase);
        //crud method post to database
        axios.post('http://localhost:5000/api/leagues/create', league)
            .then(res => {
                console.log(res.data)
                window.location = '/' //after submission brings user to the home page
            }).catch((err) =>{
                console.log(err)
            })
    }
    //handles submit code method that allows user to join of a league join code
    onSubmitCode(e){
        //prevents autoload of page
        e.preventDefault();
        const code = {
            joinCode: this.state.joinCode
        }
        //crud method post to database
        axios.post(`http://localhost:5000/api/users/joinleague/${this.props.auth.user.id}`, code)
            .then(res => {
                console.log(res.data)
               window.location = '/' //after submission brings user to the home page
            });
    }
    //handles the state for when user enters a league name
    onChangeLeagueName(e){
        this.setState({
            leagueName: e.target.value
        })
    }
    //handles the state for when user clicks on a radio button to determine the
    //scoring format
    onChangeScoringFormat(e){
        this.setState({
            scoringFormat: e.target.value
        })
        //for testing
        //console.log(e.target.value)
    }
    //handles the state for when user clicks on a button to determine the league
    //size
    onChangeLeagueSize(e){
        this.setState({
            leagueSize: e.target.value
        })
        //for testing
        //console.log(e.target.value)
    }
    //handles changing of states for join code input
    onCodeChange(e){
        this.setState({
            joinCode: e.target.value
        });
    }

        //Below is the methods to add the player database into the league:
        player2db() {
            let qb = [];
            axios
              .get('https://api.overwatchleague.com/stats/players')
              .then((res) => {
                qb.push(JSON.stringify(res.data.data))
            
                //console.log(qb); testing
              })
              .catch((error) => {
                console.log(error);
              });
              return qb;
          }

    render(){
        return(
            <div className="homePage-getstarted">
                 <NavBar></NavBar>
                <div className="home-wrapper-getstarted">
                
                    <div className="clWrapper-Or">
                       <div className="clContent-Or"><h3>Create a new league</h3>
                        <p>Don't worry you will be able to make changes later</p>
                        <form  onSubmit={this.onSubmit}>
                        <div className="league-name">
                            <label>League Name</label>
                            <br></br>
                            <input type="text" className="league-name-text" placeholder="Enter the name of your league" value={this.state.leagueName} onChange={this.onChangeLeagueName}/>                        
                        </div>
                        <div className="league-logo">
                            <div className="logo-img">
                            <div style={{paddingBottom:'10px', paddingTop: '10px'}}>
                            </div>
                              
                        </div>
                        <div className="teams">
                            <label>League Size</label>
                            <div className="btn-group-teams">
                                <ul className="league-size">
                                    <li>
                                        <input type="radio" name = "btn-group-teams-sel" onChange = {this.onChangeLeagueSize} value = {4} id="size4"/>
                                        <label htmlFor="size4">4 Teams</label>
                                    </li>
                                    <li>
                                        <input type="radio" name = "btn-group-teams-sel" onChange = {this.onChangeLeagueSize} value = {6} id="size6"/>
                                        <label htmlFor="size6">6 Teams</label>
                                    </li>
                                    <li>
                                        <input type="radio" name = "btn-group-teams-sel" onChange = {this.onChangeLeagueSize} value = {8} id="size8"/>
                                        <label htmlFor="size8">8 Teams</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="scoringFormat">
                            <label>Scoring Format</label>
                            <br></br>
                            {/* Radio Buttons that determine the scoring format depending on what the user selects */}
                            <input className="radio-scoring" type="radio" value="STD" onChange = {this.onChangeScoringFormat} name="scoring-format" /> STD
                            <br></br>
                            <input className="radio-scoring" type="radio" value="PPA" onChange = {this.onChangeScoringFormat} name="scoring-format"/> PPA
                            <br></br>
                            <input className="radio-scoring" type="radio" value="0.5 PPA" onChange = {this.onChangeScoringFormat} name="scoring-format"/> 0.5 PPA
                        </div>
                        <button type="submit" className="btn-createLeague">Get Started</button>
                    </div>
                    </form>
                    </div>
                </div>
                <div className="mid-div">
                    <h4 className = "mid-or">OR</h4>
                </div>
                <div className="cl-or-join-wrapper">

                        <form onSubmit={this.onSubmitCode}>
                        <h3 className = "mid">Join a League</h3>
                        <p>Just Enter a League Invitation Code</p>
                            <div className="codeWrapper">
                                <label>League Code</label>
                                <div>
                                    <input className="join-code" type="text" onChange = {this.onCodeChange} placeholder="Enter League Code"/>
                                </div>
                            </div>
                            
                            <button type="submit" className="btn-joinleague">Join League</button>
                        </form>
                </div>
                </div>
                
            </div>
        );
    }
}
CreateOrJoinLeague.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
  )(CreateOrJoinLeague);

