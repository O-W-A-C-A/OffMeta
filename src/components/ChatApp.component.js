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
                        <textarea className="chat-input" placeholder="Send a message"></textarea >
                        <div className="chat-btn">
                            <button type="submit" className="chat-btn-submit">Chat</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}