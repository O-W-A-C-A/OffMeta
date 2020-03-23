import React, {Component} from "react";
import { Link } from "react-router-dom";
export default class NavBar extends Component{
    render(){
        return(
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
        );
    }
}
 