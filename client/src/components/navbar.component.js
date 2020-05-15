import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
//auth
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class NavBarHome extends Component{
    constructor(props){
        super(props);

        this.handleLeagueSelection = this.handleLeagueSelection.bind(this);

        this.state = {
            length: '',//keeps track of the length state ==> amount of leagues user has joined
            leaguesJoinedArray:[],
            leagueSelected:''
        }
    }

   async handleLeagueSelection(leagueID, callback){
        
        await this.setState({leagueSelected: leagueID}, callback)
        window.location = `/home/${this.state.leagueSelected}`
        //console.log(this.state.leagueSelected)
    }

    //function to log out user
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount (){
        //getting all leagues that user is apart of
        axios.get(`http://localhost:5000/api/users/getleagues/${this.props.auth.user.id}`)
            .then((res) =>{
                this.setState({
                    length: res.data.length,
                    leaguesJoinedArray: res.data
                })             
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    render(){
        let leaguesJoined = this.state.leaguesJoinedArray
        return(
            <Navbar bg="#18202F" fixed="top" variant="dark" className="center-navbar">
            <Navbar.Brand as={Link} to='/' style={{color: '#fff'}}>OffMeta</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link as={Link} to='/'>Home</Nav.Link>
                <NavDropdown title="League" id="basic-nav-dropdown" >
                    <NavDropdown.Item as={Link} to='/create'>Create New League</NavDropdown.Item>
                    <NavDropdown.Divider />
                   
                    {/*Dynamically display leagues joined into bootstrap dropdown item*/}
                    {leaguesJoined.map(leagues =>(
                                            <NavDropdown.Item key={leagues._id} onClick={() => this.handleLeagueSelection(leagues._id, ()=>{
                                                console.log("league selected: ", this.state.leagueSelected)
                                            })}>
                                            {leagues.leagueName}
                                        </NavDropdown.Item>
                    ))}

                </NavDropdown>

                <NavDropdown title="Profile" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to='/profile'>Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.onLogoutClick}>Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavBarHome.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps,{ logoutUser })(NavBarHome);
 