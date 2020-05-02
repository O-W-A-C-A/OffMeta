import React, { Component } from "react";
import { Link } from "react-router-dom";
import BasicNavBar from './basic-navbar.component'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";


class Login extends Component {
    constructor(){
        super();

        this.state = {
            email: "",
            password: "",
            errors: {}
        }
        //this.onChange = this.onChange.bind(this)
        //this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
      // If logged in and user navigates to Login page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/home");
      }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/home"); // push user to homepage when they login
        }
        
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    onChange = e =>{
        this.setState({[e.target.id]: e.target.value})
    }

    onSubmit = e =>{
        e.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
    
   /* componentDidMount(){
    if (this.captchaDemo) {
        console.log("started, just a second...")
        this.captchaDemo.reset();
        this.captchaDemo.execute();
        }
    }

    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
            this.captchaDemo.execute();
        }
    }

    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!  
        console.log(recaptchaToken, "6LejgdkUAAAAAJMgutul8FsAuNug0JbTYyAToDpo")
      }*/

    render() 
    {
        const { errors } = this.state;
        return (
            <div className="auth-wrapper-form">
                <BasicNavBar></BasicNavBar>
                <div className="auth-inner">
                    <form noValidate onSubmit={this.onSubmit}>
                        <h3>Login</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" 
                            id="email"
                            name="email"
                            placeholder="Enter email" 
                            value={this.state.email}
                            onChange={this.onChange} 
                            className={classnames("form-control", {
                                invalid: errors.email || errors.emailnotfound
                              })}/>
                            <span className="red-text">{errors.email}{errors.emailnotfound}</span>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"
                            id="password" 
                            name="password"
                            placeholder="Enter password" 
                            value={this.state.password}
                            onChange={this.onChange}
                            className={classnames("form-control", {
                                invalid: errors.password || errors.passwordincorrect
                              })}/>
                            <span className="red-text">{errors.password}{errors.passwordincorrect}</span>
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);