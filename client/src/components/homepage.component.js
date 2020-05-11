import React, {Component} from "react";
//components
import NavBar from './navbar.component';
import MyTeam from './myteam.component';
import LeagueSettings from './league-settings.component';
import MyLeague from './myleague.component';
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
        
        const renderComponent = () =>{
            //console.log(this.state.showComponent) for testing
            switch(this.state.showComponent){
                case '1': return <MyLeague/>;
                case '2': return <MyTeam/>;
                case '3': return <LeagueSettings/>;
                default: return <MyLeague/>;
            }
        }
        return(
            <div className ="homePage" >
                <NavBar></NavBar>
                <div className="home-wrapper" >
                
                <div className="main-content">
                
                    <div className="tab">
                        <button className="tablinks" onClick={(e) =>this.onTabClick(e)} value={1}>League</button>
                        <button className="tablinks" onClick={(e) =>this.onTabClick(e)} value={2}>My Team</button>
                        <button className="tablinks" onClick={(e) =>this.onTabClick(e)} value={3}>Settings</button>                 
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