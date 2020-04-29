import React, {Component} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal} from 'react-bootstrap'
import NavBar from './navbar.component'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//auth
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import defaultimg from "../public/default-img.png"

class Profile extends Component{
    constructor(){
        super()
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        
        this.state={
            name: '',
            email: '',
            password: '',
            show:false,
            showDelete:false,
            file: defaultimg,
            imagePreviewUrl: ''
        }
    }

    

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    componentDidMount(){
       axios.get(`http://localhost:5000/api/users/${this.props.auth.user.id}`)
            .then((res) => {
                //console.log(res.data); for testing if data is actually receive
                this.setState({email: res.data.email, name: res.data.name, password: res.data.password})
            })
            .catch((err) =>{
                console.log(err);
            });

            axios
            .get(
              `http://localhost:5000/api/users/profileimage/${this.props.auth.user.id}`,
              { responseType: 'arraybuffer' },
            )
            .then(res => {
              const base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
              );
              this.setState({ file: "data:;base64," + base64 });
            });
    }

    //handles state change for images
    onFileChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }
    //handles state change for username
    onChangeName(e) {
        this.setState({
          name: e.target.value
        })
    }
    //handles state change for email
    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        })
    }
    //handles state change for password
    onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
    }

    //updates user email and username
    onSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('profileImg', this.state.file);
       

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }

        console.log(user);
        axios.put(`http://localhost:5000/api/users/update/${this.props.auth.user.id}`, user)
            .then(res => console.log(res.data))
            .catch((err) =>{
                console.log(err);
            });
        
        axios.put(`http://localhost:5000/api/users/uploadimage/${this.props.auth.user.id}`, formData, {
        }).then(res => console.log(res))
        .catch((err) =>{
            console.log(err);
        });      
    
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

    delete(){
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
        //magic
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img className="btn-profile-upload-img" src={imagePreviewUrl} alt="user profile img"/>);
        }
        else{
            $imagePreview = (<img className="btn-profile-upload-img" src={this.state.file} alt="user profile img"/>);
        }
        return(
            <div className ="homePage">
                <NavBar></NavBar>
                <div className="home-wrapper">

            <div className="profile-wrapper">
            <div className="profile-inner">
                <div className="profile-fields">
                <form>
                    <div className="profile-inner-bar">   
                        <h3 className="profile-title">Profile</h3>
                    </div>
                   
                    <div className="edit-profile">
                        <button onClick={()=>this.handleModal()} className="btn-edit-profile" type="button">Edit Profile</button>
                        <Modal className="edit-profile-modal" show={this.state.show} onHide={()=>this.handleModal()}>
                        <form onSubmit={this.onSubmit}>
                           <div className="modal-content"> <div className="edit-modal-header">
                            
                                <h3 className="edit-profile-title">Edit Profile</h3>
                            </div>
                           
                                <div className="modal-profile-control">
                                    <div style={{paddingBottom:'20px'}}>
                                        <label>Profile Image</label><br/>
                                        <input type="file" onChange={this.onFileChange} style={{color: 'white'}} />
                                    </div>

                                    <div>
                                        <label>Username</label><br/>
                                        <input type="username" className="modal-profile-form1" placeholder="Username" value={this.state.name} onChange={this.onChangeName}/>
                                    </div>

                                    <div>
                                        <label>Email address</label><br/>
                                        <input type="email" className="modal-profile-form1" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail} />
                                    </div>

                                    <div>
                                        <label>Password</label><br/>
                                        <input type="password" className="modal-profile-form1" placeholder="Password" onChange={this.onChangePassword}/>
                                    </div>

                                </div>
                         
                            <div className="edit-modal-footer">
                                <button type="submit" className="save" onClick={()=>this.handleModal()}>Save</button>
                                <button type="button" onClick={()=>this.handleModal()} className="cancel">Cancel</button>
                            </div>
                            </div>
                             </form>
                             
                        </Modal>
                    </div>
                   
                    <div className="profile-picture">
                        {$imagePreview}
                    </div>
                    <div className="profile-control">
                        <div>
                            <label style={{float: 'left'}}>Username</label><br/>
                            <input type="username" className="profile-form1" placeholder="username" defaultValue={this.state.name} />
                        </div>

                        <div>
                            <label style={{float: 'left'}}>Email</label><br/>
                            <input type="email" className="profile-form2" placeholder="email" defaultValue={this.state.email}/>
                        </div>
                        
                    </div>
                        <button type="submit" className="logoff" onClick={this.onLogoutClick}>Logoff</button>
                    </form>

                    </div>
                    <div className='delete-profile'>
                        <button className="btn-delete" onClick={this.delete}>Delete Profile</button>
                </div>
            </div>
        </div>
        
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
