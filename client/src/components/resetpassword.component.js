import React, {Component} from "react";
import NavBar from './navbar.component'
import axios from 'axios'
class ResetPassword extends Component{
    constructor(){
        super();

        this.state={
            password:''
        }
    }

    render(){
        return(
            <div className="auth-wrapper-form">
            <NavBar></NavBar>
            <div className="auth-inner">
                <form onSubmit={this.sendEmail}>
                    <h3>Reset Password</h3>
                    <p style={{color:'#7f7d7d'}}>
                        If you have forgotten your password, please enter your account's
                        email address below and click the "Reset My Password" button. You will receive
                        an email that contains a link to set a new password.   
                    </p>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={this.state.password} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Reset My Password</button>
                    </form>
            </div>
        </div>
        );
    }
}

export default ResetPassword;