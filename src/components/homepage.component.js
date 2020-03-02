import React, {Component} from "react";
import { Link } from "react-router-dom";
import NavBar from './navbar.component';
import MyTeam from './myteam.component';
import LeagueSettings from './league-settings.component';
import MyLeague from './myleague.component';
import MatchUp from "./matchup.component";
import ChatApp from "./ChatApp.component"

export default class HomePage extends Component{
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
                        <div class="tab-side">
                        <Link to={"/home"} ><button class="tablinks-side" >Home</button></Link>
                        <Link to={"/create"}><button class="tablinks-side" >Leagues</button></Link>
                        <Link to={"/profile"}><button class="tablinks-side" >Profile</button></Link>
                        <Link to={"/inbox"}><button class="tablinks-side">Inbox</button></Link>                    
                        </div>
                    </div>
                
                <div className="main-content">
                
                    <div class="tab">
                        <button class="tablinks" onClick={(e) =>this.onTabClick(e)} value={1}>Matchup</button>
                        <button class="tablinks" onClick={(e) =>this.onTabClick(e)} value={2}>My Team</button>
                        <button class="tablinks" onClick={(e) =>this.onTabClick(e)} value={3}>League</button>
                        <button class="tablinks" onClick={(e) =>this.onTabClick(e)} value={4}>Settings</button>                   
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