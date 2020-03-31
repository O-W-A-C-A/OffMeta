const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Chat room
const ChatRoomSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },

    admins: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],

    members: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],

    messages:{
        type: Schema.ObjectId,
        ref: 'Message'
    }
});

module.exports = Message = mongoose.model('chatroom', ChatRoomSchema);