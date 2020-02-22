import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import {ReCaptcha} from 'react-recaptcha-google'
export default class Landing extends Component {
    constructor(props){
        super(props);
        this.onSubmit= this.onSubmit.bind(this);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            show: false
        };

    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }

        console.log(user);

        axios.post('http://localhost:5000/User/add', user)
            .then(res => console.log(res.data));

        this.setState({ 
            username: '',
            email: '',
            password: ''
        })
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
    }
    handleModal(){
        this.setState({show:!this.state.show})
    }


    render() {
    
        return (
            <div className="landing">
                <h1>Start a fantasy league today</h1>
                <h6 style={{color: '#819091'}}>Create a free fantasy esports league in just 60 seconds</h6>
               
                <div className="login-link">
                <div className="auth-wrapper">
                <div className="auth-inner-landing">
                    <form >
                        <div className="form-group">
                           
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>

                        <div className="form-group">
                            
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <div className="custom-control custom-checkbox">
                                    <p className="forgot-password text-right">
                                        <Link to={"/forgotpassword"}>Forgot password?</Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link to={"/login"}>
                         <button className="btn-login-started">Login</button>
                         </Link> 
                         <form onSubmit={this.onSubmit}>
                    <div className="get-started">
                        <button type="button" onClick={()=>this.handleModal()} className="btn-get-started">Sign Up</button>
                            <Modal  className="signup-modal" show={this.state.show} onHide={()=>this.handleModal()}>
                                <div className="auth-wrapper">
                                    <div className="auth-inner">
                                        <form onSubmit={this.onSubmit}>
                                            <h3>Create Your Account</h3>

                                            <div className="form-group">
                                                <label>Username</label>
                                                    <input type="text" className="form-control" placeholder="Enter Username" value={this.state.username} onChange={this.onChangeUsername}/>
                                                </div>


                                                <div className="form-group">
                                                    <label>Email address</label>
                                                    <input type="email"  className="form-control" placeholder="Enter email" value={this.props.email} onChange={this.onChangeEmail}/>
                                                </div>

                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.onChangePassword}/>
                                                </div>

                                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                                <p className="forgot-password text-right">
                                                    Already registered <Link to={"/login"}>login?</Link>
                                                </p>
                                         </form>
                                        </div>
                                    </div>
                            </Modal>
                    </div>
                </form>
                        </form>
                </div>

                <ReCaptcha ref={(el) => {this.captchaDemo = el;}} size="invisible" render="explicit" sitekey="6LejgdkUAAAAAFQLhhZuls1spcCuTNp6U0f3wm_s" onloadCallback={this.onLoadRecaptcha} verifyCallback={this.verifyCallback}/>
             </div>
                    
                </div>
               
            </div>
        );
    }
}