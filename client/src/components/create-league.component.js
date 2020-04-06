import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {Home, Mail, Add, AccountBox} from '@material-ui/icons'
//components
import NavBar from './navbar.component';
import defaultimg from "../public/upload.png"
//auth
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreateLeague extends Component{
    constructor(){
        super();
        //onSubmit function delcaration will handle submitting of form to the server
        this.onSubmit = this.onSubmit.bind(this);

        //function declaration for input fields that the user will modify
        this.onChangeLeagueName = this.onChangeLeagueName.bind(this);
        this.onChangeDraftPickTrading = this.onChangeDraftPickTrading.bind(this);
        this.onChangeScoringFormat = this.onChangeScoringFormat.bind(this);
        this.onChangeLeagueSize = this.onChangeLeagueSize.bind(this);
        this.onFileChange = this.onFileChange.bind(this);

        //setting default state of all variables
        this.state = {
            leagueName:'',
            draftPickTrading: false,
            scoringFormat: 'STD',
            leagueSize: 4,
            logo: defaultimg,
            imagePreviewUrl: '',
            createdBy:''
        };
    }

    onSubmit(e){
        //prevents autoload of page
        e.preventDefault();

        const league = new FormData();
        league.append('logo', this.state.logo);
        league.append('leagueName', this.state.leagueName);
        league.append('draftPickTrading', this.state.draftPickTrading);
        league.append('scoringFormat', this.state.scoringFormat);
        league.append('leagueSize', this.state.leagueSize);
        league.append('createdBy', this.props.auth.user.id);
        //prints to console league information
        console.log(league);
        //crud method post to database
        axios.post('http://localhost:5000/api/leagues/create', league)
            .then(res => console.log(res.data));
        //sets the state back to its default values
        this.setState({ 
            leagueName:'',
            draftPickTrading: false,
            scoringFormat: 'STD',
            leagueSize: 4,
            logo:defaultimg
        })

        //after submission brings user to the home page
       window.location = '/home';
    }
    //handles the state for when user enters a league name
    onChangeLeagueName(e){
        this.setState({
            leagueName: e.target.value
        })
    }
    //handles the state for when user toggles switch to allow draft pick trading
    onChangeDraftPickTrading(e){
        this.setState({
            draftPickTrading: !this.state.draftPickTrading
        })
        //for testing
        //console.log(!this.state.draftPickTrading);
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
    //handles the the state for when the user uploads a league image
    //this image is optional
    //handles state change for images
    onFileChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            logo: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }
    render(){
        //magic
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img class="btn-upload-img" src={imagePreviewUrl} />);
        }
        else{
            $imagePreview = (<img class="btn-upload-img" src={this.state.logo} />);
        }

        return(
            
            <div className="homePage">
                 <NavBar></NavBar>
                <div className="home-wrapper">
               
                <div className="sideBar">
                    <div className="tab-side">
                        <Link to={"/home"} ><button className="tablinks-side"><Home className="side-icons"/>Home</button></Link>
                        <Link to={"/create"}><button className="tablinks-side"><Add className="side-icons"/>Leagues</button></Link>
                        <Link to={"/profile"}><button className="tablinks-side"><AccountBox className="side-icons"/>Profile</button></Link>
                        <Link to={"/inbox"}><button className="tablinks-side"><Mail className="side-icons"/>Inbox</button></Link>                    
                    </div>
                </div>
                
                    <div className="clWrapper">
                       <div className="clContent"><h3>Create a new league</h3>
                        <p>Don't worry you all be to make changes later to all settings later</p>
                        <form  onSubmit={this.onSubmit}>
                        <div className="league-name">
                            <label>League Name</label>
                            <br></br>
                            <input type="text" className="league-name-text" placeholder="Enter the name of your league" value={this.state.leagueName} onChange={this.onChangeLeagueName}/>                        
                        </div>
                        <div className="league-logo">
                            <label>Optional Logo</label>
                            <div className="logo-img">
                            {$imagePreview}
                            <div style={{paddingBottom:'10px', paddingTop: '10px'}}>
                            <input type="file" onChange={this.onFileChange} style={{color: 'white'}} />
                            </div>
                              
                        </div>
                        <div className="teams">
                            <label>League Size</label>
                            <div className="btn-group-teams">
                                <ul className="league-size">
                                    <li>
                                        <input type="radio" name = "btn-group-teams-sel" onChange = {this.onChangeLeagueSize} value = {4} id="size4"/>
                                        <label for="size4">4 Teams</label>
                                    </li>
                                    <li>
                                        <input type="radio" name = "btn-group-teams-sel" onChange = {this.onChangeLeagueSize} value = {6} id="size6"/>
                                        <label for="size6">6 Teams</label>
                                    </li>
                                    <li>
                                        <input type="radio" name = "btn-group-teams-sel" onChange = {this.onChangeLeagueSize} value = {8} id="size8"/>
                                        <label for="size8">8 Teams</label>
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
                        <div className="allow-draft-trade">
                            <label>Allow Draft Picking Trading</label>
                            <br></br>
                            <label className="switch">
                                <input value = {this.state.draftPickTrading} onChange = {this.onChangeDraftPickTrading} type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <button type="submit" className="btn-createLeague">Finish</button>
                    </div>
                    </form>
                    </div>
                </div>
                <div className="bar">

                </div>
                </div>
                
            </div>
        );
    }
}

CreateLeague.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps)(CreateLeague);