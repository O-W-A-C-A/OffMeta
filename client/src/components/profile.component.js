import React, {Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal} from 'react-bootstrap'
import NavBar from './navbar.component'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import defaultimg from "../public/default-img.png"

class Profile extends Component{
    constructor(){
        super()
        this.onChangename = this.onChangename.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        
        this.state={
            name: '',
            id: '',
            email: '',
            password: '',
            show:false,
            showDelete:false
        }
    }

    

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    componentDidMount(){
       axios.get(`http://localhost:5000/api/users/${this.props.auth.user.id}`)
            .then((res) => {
                console.log(res.data);
                this.setState({email: res.data.email, name: res.data.name, password: res.data.password})
            })
            .catch((err) =>{
                console.log(err);
            });
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

    //updates user email and username
    onSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        console.log(user);

        axios.put(`http://localhost:5000/api/users/update/${this.props.auth.user.id}`, user)
            .then(res => console.log(res.data));
        
    }

    //deletes user based off id
    onDelete() {
        axios.delete(`http://localhost:5000/api/users/delete/${this.props.auth.user.id}`)
            .then(res => console.log(res.data));
    }

    handleModal(){
        this.setState({show:!this.state.show})
    }
    handleDeleteModal(){
        this.setState({showDelete:!this.state.showDelete})
    }

    delete = () => {
        confirmAlert({
          title: 'Delete Account',
          message: 'You are about to delete your account, it was nice knowing you :(',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.onDelete()
            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        });
      };

    render(){
        return(
            <div className ="homePage">
                <NavBar></NavBar>
                <div className="home-wrapper">

                <div className="sideBar">
                    <div class="tab-side">
                        <Link to={"/home"} ><button class="tablinks-side" >Home</button></Link>
                        <Link to={"/create"}><button class="tablinks-side" >Leagues</button></Link>
                        <Link to={"/profile"}><button class="tablinks-side" >Profile</button></Link>
                        <Link to={"/inbox"}><button class="tablinks-side">Inbox</button></Link>                    
                    </div>
                </div>

            <div className="profile-wrapper">
            <div className="profile-inner">
                <div className="profile-fields">
                <form>
                    <div className="profile-inner-bar">   
                        <h3 className="profile-title">Profile</h3>
                    </div>
                    <form onSubmit={this.onSubmit}>
                    <div className="edit-profile">
                        <button onClick={()=>this.handleModal()} className="btn-edit-profile" type="button">Edit Profile</button>
                        <Modal className="edit-profile-modal" show={this.state.show} onHide={()=>this.handleModal()}>
                           <div className="modal-content"> <div className="edit-modal-header">
                            
                                <h3 className="edit-profile-title">Edit Profile</h3>
                            </div>
                            <div className="edit-modal-body">
                                <div className="modal-profile-control">
                                    <input type="username" className="modal-profile-form1" placeholder="Username" value={this.state.name} onChange={this.onChangename}/>
                                    <input type="email" className="modal-profile-form1" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail} />
                                    <input type="password" className="modal-profile-form1" placeholder="Password" onChange={this.onChangePassword}/>
                                </div>
                            </div>
                            <div className="edit-modal-footer">
                                <button type="submit" className="save" onClick={()=>this.handleModal(),this.onSubmit}>Save</button>
                                <button type="submit" onClick={()=>this.handleModal()} className="cancel">Cancel</button>
                            </div>
                            </div>
                        </Modal>
                    </div>
                    </form>
                    <div className="profile-picture">
                        <button type="upload" className="btn-profile-upload"><img src={defaultimg} className="btn-profile-upload-img"alt="my image"></img></button>
                    </div>
                    <div className="profile-control">
                        <input type="username" className="profile-form1" placeholder="username" value={this.state.name} />
                        <br/><input type="email" className="profile-form2" placeholder="email" value={this.state.email}/>
                    </div>
                   
                        <button type="submit" className="logoff" onClick={this.onLogoutClick}>Logoff</button>
                    </form>

                    </div>
                    <div className='delete-profile'>
                        <button className="btn-delete" onClick={this.delete}>Delete Profile</button>
                </div>
            </div>
        </div>
        
        <div className="bar"></div>
        
        </div>
        </div>
        );
    }
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps,{ logoutUser })(Profile);
