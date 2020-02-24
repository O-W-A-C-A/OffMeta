import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import {ReCaptcha} from 'react-recaptcha-google'
import NavBarLanding from './navbar-landing.component'
import Image from './filler_picture.png'
export default class Landing extends Component {
    constructor(props){
        super(props);
        this.onSubmit= this.onSubmit.bind(this);

        this.onChangename = this.onChangename.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            show: false
        };

    }

    onSubmit(e) {
        e.preventDefault();

        const users = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            show:false
        }

        console.log(users);

        axios.post('http://localhost:5000/users/add', users)
            .then(res => console.log(res.data));

        this.setState({ 
            name: '',
            email: '',
            password: '',
            show:false
        })
    }

    onChangename(e) {
        this.setState({
          name: e.target.value
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
                                                    <input type="text" className="form-control" placeholder="Enter Username" value={this.state.name} onChange={this.onChangename}/>
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
                    
                    <Link to={"/login"}>
                         <button className="btn-login-started">Login</button>
                    </Link> 
                </form>
                    
                </div>

                <ReCaptcha ref={(el) => {this.captchaDemo = el;}} size="invisible" render="explicit" sitekey="6LejgdkUAAAAAFQLhhZuls1spcCuTNp6U0f3wm_s" onloadCallback={this.onLoadRecaptcha} verifyCallback={this.verifyCallback}/>
             </div>

                </div>
                
                </div>
                <div className="landing-left-content">
                <img className="landing-img" src={Image} alt="landing-image"/>  
                 <h2 style={{textAlign: 'center'}}> Esports is better with friends</h2>
                 <h6 style={{textAlign: 'center'}}>OffMeta is a fantasy esports league and chat all in one platform 
                    Have fun and enjoy esports with your closest friends</h6>
             </div>
            </div>
        );
    }
}