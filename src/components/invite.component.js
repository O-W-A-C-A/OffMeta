import React, {Component} from "react";
import axios from 'axios';
import NavBar from './navbar.component'

export default class ContactUs extends Component
{
    constructor(props){
        super(props);
        this.onSubmit= this.onSubmit.bind(this);

        this.onChangeUserName = this.onChangeUserName.bind(this);

        this.state = {
            userName: ''
        };

    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            userName: this.state.userName,
        }

        console.log(user);

        axios.post('http://localhost:5000/User/invite', user)
            .then(res => console.log(res.data));

        this.setState({ 
            userName: '',
        })
    }

    onChangeUserName(e) {
        this.setState({
          userName: e.target.value
        })
    }

    render(){
        return(
            <div className="auth-wrapper">
             <div className="auth-inner">
                <form onSubmit={this.onSubmit}>
                    <h3>Invite</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter the username" value={this.state.userName} onChange={this.onChangeUserName}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Send Invite</button>
                </form>
                </div>
            </div>
        );
    }
}