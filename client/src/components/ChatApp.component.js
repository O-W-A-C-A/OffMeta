import React, {Component} from 'react';
import io from 'socket.io-client'
import axios from 'axios'
//auth
import PropTypes from "prop-types";
import { connect } from "react-redux";
const socket = io.connect("http://localhost:5000");
class ChatApp extends Component{
    constructor(props){
        super(props);
        this.state={
            message:'',
            chat:[],
            name:'',
            leagueID: this.props.leagueIDFromParent,//testing
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/users/${this.props.auth.user.id}`)
        .then((res) => {
            //console.log(res.data); for testing if data is actually receive
            this.setState({name:res.data.name})
            //LATER ON THIS VALUE SHOULD BE UPDATED WHEN A USER CREATES A NEW LEAGUE OR SWITCHES TO 
            //ANOTHER OF THEIR LEAGUES
        })
        .catch((err) =>{
            console.log(err);
        });

        var path = window.location.pathname
        var sub = path.substring(6)

        var room = sub
        console.log('chat app ',room)
        socket.on('connect', function(){
            socket.emit('room', room);
        });
        
        socket.on("chat message", ({ name, message }) => {
          // Add new messages to existing messages in "chat"
          this.setState({
            chat: [...this.state.chat, { name, message }]
          });
        });
    }
    
    renderChat() {
        const { chat } = this.state;
        return chat.map(({ name, message }, idx) => (
          <div key={idx}>
            <span style={{ color: "green" }}>{name}: </span>
    
            <span style={{color: "white"}}>{message}</span>
          </div>
        ));
      }
    
    // Function for getting text input
    onMessageChange = e =>{
        this.setState({ message: e.target.value });
    }

    // Function for sending message to chat server
    onMessageSubmit = e =>{
        e.preventDefault();
        const {name, message} = this.state;
        socket.emit("chat message", {name, message});
        this.setState({ message: ''});
    };

    keypress(e){ 
        if(e.key === 'Enter'){
            e.preventDefault();
            const {name, message} = this.state;
            socket.emit("chat message", {name, message});
            this.setState({ message: ''});
        }
    }

    render(){
       
        return(
            <div className="chat-container">
                <div className="chat-header">
                    <div className="chat-title">League Chat</div>
                </div>
                <div className="chat-body">
                <div>{this.renderChat()}</div>
                </div>
                <div className="chat-footer">
                        <textarea className="chat-input" placeholder="Send a message" onChange={e => this.onMessageChange(e)} onKeyPress={this.keypress.bind(this)} value={this.state.message}></textarea >
                        <div className="chat-btn">
                            <button type="submit" onClick={this.onMessageSubmit} className="chat-btn-submit">Chat</button>
                        </div>
                    </div>
            </div>
        )
    }
}
ChatApp.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(ChatApp);