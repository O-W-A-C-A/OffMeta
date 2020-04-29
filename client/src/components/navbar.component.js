import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Navbar, Nav, NavDropdown } from 'react-bootstrap';
//auth
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class NavBarHome extends Component{

    //function to log out user
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render(){
        return(
            <Navbar bg="#18202F" fixed="top" variant="dark" className="center-navbar">
            <Navbar.Brand as={Link} to='/' style={{color: '#fff'}}>OffMeta</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link as={Link} to='/' >Home</Nav.Link>
                <NavDropdown title="League" id="basic-nav-dropdown" >
                    <NavDropdown.Item as={Link} to='/create'>Create New League</NavDropdown.Item>
                    <NavDropdown.Divider />
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
 

/*
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-title" to={"/"} style={{color: '#fff'}}>OffMeta</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                            </ul>
                        </div>
                    </div>
                </nav>
            </div> 
            */