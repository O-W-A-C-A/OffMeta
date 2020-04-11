import React, {Component} from "react";
import NavBar from './navbar.component'
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { forgotPassword } from "../actions/authActions";

class ForgotPassword extends Component{
    constructor(){
        super()

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            email:'',
            errors: {}
        }

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }


    onChangeEmail = e =>{
        this.setState({email: e.target.value})
        console.log(this.state.email)
    }
    
    //sends reset password link to user email
    onSubmit = e =>{
        e.preventDefault();
        const email = {
            email: this.state.email
        }
        this.props.forgotPassword(email, this.props.history);
    }

    render(){
        const { errors } = this.state;
        return(
            <div className="auth-wrapper-form">
            <NavBar></NavBar>
            <div className="auth-inner">
                <form onSubmit={this.onSubmit}>
                    <h3>Forgot Password</h3>
                    <p style={{color:'#7f7d7d'}}>
                        If you have forgotten your password, please enter your account's
                        email address below and click the "Email Me a Recovery Link" button. You will receive
                        an email that contains a link to set a new password.   
                    </p>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" placeholder="Enter email" onChange={this.onChangeEmail} value={this.state.email}  className={classnames("form-control", {
                                invalid: errors.email || errors.emailnotfound
                              })}/>

                        <span className="red-text">{errors.email}{errors.emailnotfound}</span>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Email Me a Recovery Link</button>
                    </form>
            </div>
        </div>
        );
    }
}

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    errors: state.errors
  });

export default connect(
    mapStateToProps,
    { forgotPassword }
  )(withRouter(ForgotPassword));