import React, {Component} from "react";
import axios from 'axios';
import NavBar from './navbar.component'

export default class ContactUs extends Component
{
    constructor(props){
        super(props);
        this.onSubmit= this.onSubmit.bind(this);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);

        this.state = {
            contactEmail: '',
            contactSubject: '',
            contactMessage: ''
        };

    }

    onSubmit(e) {
        e.preventDefault();

        const contact = {
            contactEmail: this.state.contactEmail,
            contactSubject: this.state.contactSubject,
            contactMessage: this.state.contactMessage,
        }

        console.log(contact);

        axios.post('http://localhost:5000/users/contact', contact)
            .then(res => console.log(res.data));

        this.setState({ 
            contactEmail: '',
            contactSubject: '',
            contactMessage: ''
        })
    }

    onChangeEmail(e) {
        this.setState({
          contactEmail: e.target.value
        })
    }

    onChangeSubject(e) {
        this.setState({
          contactSubject: e.target.value
        })
    }

    onChangeMessage(e) {
        this.setState({
          contactMessage: e.target.value
        })
    }

    render(){
        return(
            <div className="auth-wrapper">
             <div className="auth-inner">
                <form onSubmit={this.onSubmit}>
                    <h3>Contact Us</h3>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" placeholder="Type your email" value={this.state.contactEmail} onChange={this.onChangeEmail}/>
                    </div>


                    <div className="form-group">
                        <label>Subject:</label>
                        <input type="text"  className="form-control" placeholder="Type the subject" value={this.state.contactSubject} onChange={this.onChangeSubject}/>
                    </div>

                    <div className="form-group">
                        <label>Message:</label>
                        <textarea rows="10" type="text" className="form-control" placeholder="Enter your message here" value={this.state.contactMessage} onChange={this.onChangeMessage}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Send Message</button>
                </form>
                </div>
            </div>
        );
    }
}