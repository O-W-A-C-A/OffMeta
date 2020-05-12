import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal} from 'react-bootstrap'
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import NavBarLanding from './navbar-landing.component'
import Image from '../public/filler_picture.png'

class Landing extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {},
            show: false
        };
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

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
      }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        
        this.props.registerUser(newUser, this.props.history);
    };

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
      };

    handleModal(){
        this.setState({show:!this.state.show})
    }

    render() {
        const { errors } = this.state;
        return (
            
            <div className="landing" style={{background: 'linear-gradient(90deg, #1B95DF 50%, #18202F 50%)'}}>
                <div className="landing-right-content">
                <div className="navbar">
                    <NavBarLanding></NavBarLanding>
                </div>
                <div className="landing-title">
                    <h2>Start a fantasy league today</h2>
                    <h6 style={{color: '#819091'}}>Create a free fantasy esports league in just 60 seconds</h6>
                </div>
                <div className="login-link">
                    <div className="auth-wrapper-landing">
                        <div className="auth-inner-landing">
                    
                    <div className="get-started">
                        <button type="button" onClick={()=>this.handleModal()} className="btn-get-started">Sign Up</button>
                            <Modal  className="signup-modal" show={this.state.show} onHide={()=>this.handleModal()}>
                                <div className="auth-wrapper">
                                    <div className="auth-inner">
                                        <form noValidate onSubmit={this.onSubmit}>
                                            <h3>Create Your Account</h3>

                                            <div className="form-group">
                                                <label>Username</label>
                                                    <input type="text" id="name" placeholder="Enter Username" value={this.state.name} onChange={this.onChange} error={errors.name} className={classnames("form-control", {invalid: errors.name})}/>
                                                    <span className="red-text">{errors.name}</span>
                                               </div>
                                                
                                                <div className="form-group">
                                                    <label>Email address</label>
                                                    <input type="email" id="email" placeholder="Enter email" value={this.state.email} onChange={this.onChange} error={errors.email} className={classnames("form-control", {invalid: errors.email})}/>
                                                    <span className="red-text">{errors.email}</span>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="password" id="password" placeholder="Enter password" value={this.state.password} onChange={this.onChange} error={errors.password} className={classnames("form-control", {invalid: errors.password})}/>
                                                    <span className="red-text">{errors.password}</span>
                                                </div>

                                                <div className="form-group">
                                                    <label>Confirm Password</label>
                                                    <input type="password" id="password2"  placeholder="Confirm password" value={this.state.password2} onChange={this.onChange} error={errors.password2} className={classnames("form-control", {invalid: errors.password2})}/>
                                                    <span className="red-text">{errors.password2}</span>
                                                </div>

                                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                                <p className="forgot-password text-right">
                                                     <Link to={"/login"}>Already registered?</Link>
                                                </p>
                                         </form>
                                        </div>
                                    </div>
                            </Modal>
                    </div>
                    
                    <Link to={"/login"}>
                         <button className="btn-login-started">Login</button>
                    </Link> 
                
                    
                </div>
             </div>

                </div>
                
                </div>
                <div className="landing-left-content">
                <img className="landing-img" src={Image} alt="landing-img"/>  
                 <h2 style={{textAlign: 'center'}}> Esports is better with friends</h2>
                 <h6 style={{textAlign: 'center'}}>OffMeta is a fantasy esports league and chat all in one platform 
                    Have fun and enjoy esports with your closest friends</h6>
             </div>
            </div>
        );
    }
}

Landing.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Landing));