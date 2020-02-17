import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
export default class  extends Component {

    constructor(props){
        super(props);
    }



    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form >
                        <h3>Login</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                        <p className="forgot-password text-right">
                            <Link to={"/forgotpassword"}>Forgot password?</Link>
                        </p>
                        </form>
                </div>
            </div>
        );
    }
}