import React, {Component} from "react";
import { Link } from "react-router-dom";
export default class NavBar extends Component{
    render(){
        return(
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-land fixed-top">
                    <div className="container">
                        <Link className="navbar-title-landing" to={"/"} style={{color: '#fff'}}>OffMeta</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li>
                                    <input type="email" className="landing-form-control" placeholder="Email"/>
                                </li>
                                <li>
                                    <input type="password" className="landing-form-control" placeholder="Password"/>
                                </li>
                                <li className="nav-item">
                                <Link to={"/login"}>
                                    <button className="landing-btn">Login</button>
                                </Link> 
                                
                                </li> 
                            </ul>
                        </div>
                    </div>
                </nav>
            </div> 
        );
    }
}
 