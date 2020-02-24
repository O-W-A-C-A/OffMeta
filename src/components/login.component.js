import React, { Component } from "react";
import { Link } from "react-router-dom";
import {ReCaptcha} from 'react-recaptcha-google'
export default class  extends Component 
{
    constructor(props, context){
        super(props, context);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
    }
    componentDidMount(){
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
      }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form >
                        <h3>Login</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" 
                            className="form-control" 
                            name="password"
                            placeholder="Enter email" 
                            value={this.state.email}
                            onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" 
                            className="form-control" 
                            name="password"
                            placeholder="Enter password" 
                            value={this.state.password}
                            onChange={this.onChange}/>
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

                <ReCaptcha ref={(el) => {this.captchaDemo = el;}} size="invisible" render="explicit" sitekey="6LejgdkUAAAAAFQLhhZuls1spcCuTNp6U0f3wm_s" onloadCallback={this.onLoadRecaptcha} verifyCallback={this.verifyCallback}/>
            </div>
        );
    }
}