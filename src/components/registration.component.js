import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
export default class Registration extends Component {

    constructor(props){
        super(props);
        this.onSubmit= this.onSubmit.bind(this);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: '',
            email: '',
            password: ''
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

    render() {
        return (
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
        );
    }
}