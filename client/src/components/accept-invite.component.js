import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from './navbar.component'

class AcceptInvite extends Component {
    constructor(){
        super();
        this.state={
            email: '',
            id: '',
            leagueName: '',
        }
    }

    handleChange = name => (event) =>{
        this.setState({
            [name]: event.target.value,
        });
    }

    render() 
    {
        const {email} = this.state;
        return (
            <div className="auth-wrapper-form">
                <NavBar></NavBar>
                <div className="auth-inner">
                    <form noValidate onSubmit={this.onSubmit}>
                        <h3 >You have been invited to Join: {`${this.leagueName}`}</h3>
                        <p style={{color:'#7f7d7d'}}>To confirm enter your email and click on the accept button below</p>
                        
                        <div className="form-group">
                            <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={this.handleChange('email')}/>
                        </div>
                        
                        <button type="submit" className="btn btn-primary btn-block">Join League</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AcceptInvite;