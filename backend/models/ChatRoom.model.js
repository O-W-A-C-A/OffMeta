const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const ChatRoomSchema = new Schema({
    roomName: {
        type: String,
        required: true
    }
});

module.exports = Message = mongoose.model('chatroom', ChatRoomSchema);