import React, {Component} from "react";


export default class ForgotPassword extends Component{
    render(){
        return(
            <div className="auth-wrapper">
            <div className="auth-inner">
                <form >
                    <h3>Forgot Password</h3>
                    <p style={{color:'#7f7d7d'}}>
                        If you have forgotten your password, please enter your acconut's
                        email address below and click the "Reset My Password" button. You will reaceive
                        an email that contains a link to set a new password.   
                    </p>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Reset My Password</button>
                    </form>
            </div>
        </div>
        );
    }
}