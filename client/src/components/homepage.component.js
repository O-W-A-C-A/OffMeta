import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Home, Mail, Add, AccountBox} from '@material-ui/icons'
//components
import NavBar from './navbar.component';
import MyTeam from './myteam.component';
import LeagueSettings from './league-settings.component';
import MyLeague from './myleague.component';
import MatchUp from "./matchup.component";
import ChatApp from "./ChatApp.component"

//auth
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            showComponent: 0
        };
        this.onTabClick = this.onTabClick.bind(this);
    }

    onTabClick = (e) => {
        this.setState({showComponent: e.target.value});
        console.log(e.target.value);
    }

    render(){
        const { user } = this.props.auth;
        const renderComponent = () =>{
            console.log(this.state.showComponent)
            switch(this.state.showComponent){
                case '1': return <MatchUp/>;
                case '2': return <MyTeam/>;
                case '3': return <MyLeague/>;
                case '4': return <LeagueSettings/>;
                default: return <MatchUp/>;
            }
        }
        return(
            <div className ="homePage" >
                <NavBar></NavBar>
                <div className="home-wrapper" >
                    <div className="sideBar">
                        <div className="tab-side">
                        <Link to={"/home"} ><button className="tablinks-side"><Home className="side-icons"/>Home</button></Link>
                        <Link to={"/create"}><button className="tablinks-side"><Add className="side-icons"/>Leagues</button></Link>
                        <Link to={"/profile"}><button className="tablinks-side"><AccountBox className="side-icons"/>Profile</button></Link>
                        <Link to={"/inbox"}><button className="tablinks-side"><Mail className="side-icons"/>Inbox</button></Link>                    
                        </div>
                    </div>
                
                <div className="main-content">
                
                    <div class="tab">
                        <button className="tablinks" onClick={(e) =>this.onTabClick(e)} value={1}>Matchup</button>
                        <button className="tablinks" onClick={(e) =>this.onTabClick(e)} value={2}>My Team</button>
                        <button className="tablinks" onClick={(e) =>this.onTabClick(e)} value={3}>League</button>
                        <button className="tablinks" onClick={(e) =>this.onTabClick(e)} value={4}>Settings</button>                   
                    </div>

                    <div className="main-content-body">
                            {renderComponent()}
                    </div> 

                </div>

                    <div className="side-chat">
                        <ChatApp/>
                    </div>
                </div>
            </div>
        );

    }
}
HomePage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(HomePage);