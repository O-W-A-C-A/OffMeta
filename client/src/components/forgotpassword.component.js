import React, {Component} from "react";
import NavBar from './navbar.component'
import axios from 'axios'
class ForgotPassword extends Component{
    constructor(){
        super();

        this.state={
            email:'',
            showError: false,
            messageFromServer:''
        }
    }

    handleChange = name => e =>{
        this.setState({
            [name]: e.target.value
        });
    }

    sendEmail = e =>{
        e.preventDefault();
        if(this.state.email === ''){
            this.setState({
                showError: false,
                messageFromServer:''
            });
        }
        else{
            axios.post(`http://localhost:5000/api/users/forgotpassword/${this.state.email}`,{
                email:this.state.email
            })
            .then(res=>{
                console.log(res.data);
                if(res.data === 'email does not exist'){
                    this.setState({
                        showError: true,
                        messageFromServer: ''
                    })
                }
                else if(res.data === 'recovery email sent'){
                    this.setState({
                        showError: false,
                        messageFromServer:''
                    })
                }
            })
            .catch(err=>{
                console.log(err.data);
            });
        }
    }
    render(){
        const {email, showNullError, showError} = this.state;
        return(
            <div className="auth-wrapper-form">
            <NavBar></NavBar>
            <div className="auth-inner">
                <form onSubmit={this.sendEmail}>
                    <h3>Forgot Password</h3>
                    <p style={{color:'#7f7d7d'}}>
                        If you have forgotten your password, please enter your account's
                        email address below and click the "Reset My Password" button. You will receive
                        an email that contains a link to set a new password.   
                    </p>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={this.handleChange('email')}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Reset My Password</button>
                    </form>
                    {showNullError &&(
                        <div>
                            <p>The email address cannot be empty</p>
                        </div>
                    )}
                    {showError && (
                        <div>
                            <p>Email address is not found, please try again or register for a new account</p>
                        </div>
                    )}
            </div>
        </div>
        );
    }
}

export default ForgotPassword;