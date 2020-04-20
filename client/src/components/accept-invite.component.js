import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from './navbar.component'
import axios from 'axios'
import PropTypes from 'prop-types'

export default class AcceptInvite extends Component {
    constructor(){
        super();
        this.state={
            email: '',// in reference to user email
            id: '',// in reference to league id
            leagueName: '',
        }
    }

    async componentDidMount(){
        const{
            match:{
                params:{token}
            },
        } = this.props;

        try{
            const res = await axios.get('http://localhost:5000/api/invite',{
                params:{
                    //setting league id to token
                    id: token,
                },
            });

            console.log(res)
            if(res.data.message === 'League Invite is a-okay'){
                this.setState({id: res.data.id, leagueName: res.data.leagueName});
                console.log(this.state.leagueName)
            }

        }catch(error){
            console.log(error.response.data)
        }
    }

    handleChange = name => (event) =>{
        this.setState({
            [name]: event.target.value,
        });
    }

    onSubmit = e =>{

        e.preventDefault();
        const accept = {
            email: this.state.email,
            id: this.state.id
        }

        console.log(this.state.id)

        axios.put('http://localhost:5000/api/leagues/acceptinvite', accept)
            .then(res =>{
                console.log(res)
                //window.location = '/login'
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    render() 
    {
        const {email, leagueName} = this.state;
        return (
            <div className="auth-wrapper-form">
                <NavBar></NavBar>
                <div className="auth-inner">
                    <form onSubmit={this.onSubmit}>
                        <h3 >You have been invited to Join: {`${leagueName}`}</h3>
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

AcceptInvite.propTypes = {
    // eslint-disable-next-line react/require-default-props
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired,
      }),
    }),
  };