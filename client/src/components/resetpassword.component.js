import React, {Component} from "react";
import BasicNavBar from './basic-navbar.component'
import axios from 'axios'
import PropTypes from 'prop-types'
export default class ResetPassword extends Component{
    constructor(){
        super();

        this.state={
            email:'',
            password:'',
        }
    }

    async componentDidMount(){
        const{
            match:{
                params:{token}
            },
        } = this.props;
        try{
            const res = await axios.get('http://localhost:5000/api/reset/',{
                params:{
                    resetPasswordToken: token,
                },
            });

            console.log(res)
            if(res.data.message === 'password reset link is a-okay'){
                this.setState({email: res.data.email,
                
            });

            console.log(this.state.email)
        }
        }catch(error){
            console.log(error.response.data);
        }
    }

    handleChange = name => (event) => {
        this.setState({
          [name]: event.target.value,
        });
      };

      onSubmit = e =>{
        e.preventDefault();

        const reset = {
            email: this.state.email,
            password: this.state.password
        }
        axios.put('http://localhost:5000/api/users/resetpassword/', reset)
            .then(res =>{
                console.log(res)
                window.location = '/login'
            })
            .catch((err) =>{
                console.log(err);
            }); 
      }

    render(){

        const {password} = this.state;

        return(
            <div className="auth-wrapper-form">
            <BasicNavBar></BasicNavBar>
            <div className="auth-inner">
                <form onSubmit={this.onSubmit}>
                    <h3>Reset Password</h3>
                    <p style={{color:'#7f7d7d'}}>
                          Enter your new password below
                    </p>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter new password" value={password} onChange={this.handleChange('password')}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Reset My Password</button>
                    </form>
            </div>
        </div>
        );
    }
}

ResetPassword.propTypes = {
    // eslint-disable-next-line react/require-default-props
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired,
      }),
    }),
  };