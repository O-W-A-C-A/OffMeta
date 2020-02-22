import React, {Component} from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal} from 'react-bootstrap'
export default class Profile extends Component{
    constructor(){
        super()
            this.state={
                show:false,
                showDelete:false
            }
    }

    handleModal(){
        this.setState({show:!this.state.show})
    }
    handleDeleteModal(){
        this.setState({showDelete:!this.state.showDelete})
    }
    render(){
        return(
            <div className ="homePage">
                <div className="sideBar">
                    <ul className="sideBar-list">
                        <div className="firstSide">
                             <li><Link className="home" to={"/home"}>Home</Link></li>
                        </div>
                        <div className="secondSide">
                            <li><Link className="inbox" to={"/inbox"}>Inbox</Link></li>
                        </div>
                        <div className="thirdSide">
                            <li><Link className="league" to={"/create"}>League</Link></li>
                        </div>
                        <div className="fourthSide">
                            <li><Link className="profile" to={"/profile"}>Profile</Link></li>
                        </div>
                        <div className="fifthSide">
                            <li><Link className="more" to={"/more"}>...More</Link></li>
                        </div>
                    </ul>
                </div>

            <div className="profile-wrapper">
            <div className="profile-inner">
                <form>
                    <div className="profile-inner-bar">   
                        <h3 className="profile-title">Profile</h3>
                    </div>
                    <div className="edit-profile">
                        <button onClick={()=>this.handleModal()} className="btn-edit-profile" type="button">Edit Profile</button>
                        <Modal className="edit-profile-modal" show={this.state.show} onHide={()=>this.handleModal()}>
                           <div className="modal-content"> <div className="edit-modal-header">
                                <h3 className="edit-profile-title">Edit Profile</h3>
                            </div>
                            <div className="edit-modal-body">
                                <div className="modal-profile-control">
                                    <input type="username" className="modal-profile-form1" placeholder="Username" />
                                    <input type="email" className="modal-profile-form1" placeholder="Email" />
                                    <input type="password" className="modal-profile-form1" placeholder="Password" />
                                </div>
                            </div>
                            <div className="edit-modal-footer">
                                <button type="submit"className="save" onClick={()=>this.handleModal()}>Save</button>
                                <button type="submit" onClick={()=>this.handleModal()} className="cancel">Cancel</button>
                            </div>
                            </div>
                        </Modal>
                    </div>
                    <div className="profile-picture">
                        <button type="upload" className="btn-profile-upload-img"></button>
                    </div>
                    <div className="profile-control">
                        <input type="username" className="profile-form1" placeholder="username" />
                        <input type="email" className="profile-form2" placeholder="email" />
                    </div>
                   
                        <button type="submit" className="logoff">Logoff</button>
                    </form>
            </div>
        </div>
        </div>
        );
    }
}
