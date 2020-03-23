import React, {Component} from "react";
import NavBar from './navbar.component'

export default class AboutUs extends Component{
    render(){
        return(
            <div className="auth-wrapper-form">
            <NavBar></NavBar>
            <div className="auth-inner">
                <form>
                    <h3>About Us</h3>
                    <p style={{color:'#7f7d7d'}}>
                        We are Offmeta and this is our about us page.
                        It is still under construction.
                    </p>
                </form>
            </div>
        </div>
        );
    }
}