import React, {Component} from 'react';
export default class ChatApp extends Component{
    render(){
        return(
            <div className="chat-container">
                <div className="chat-header">
                    <p>League Chat</p>
                </div>
                <div className="chat-body">
                    <div className="chat-messages">
                        
                    </div>
                    <div className="chat-footer">
                        <input className="chat-input" placeholder="Start Chatting"></input>
                    </div>
                </div>

            </div>
        )
    }
}