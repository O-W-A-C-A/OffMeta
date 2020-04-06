const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Messages
const MessageSchema = new Schema({
  content: {
      type: String,
      required: true
  },

  sender: {
      type: String,
      required: true
  },
  receiver: {

  }
},
{timestamps: true}
);

module.exports = Message = mongoose.model('messages', MessageSchema);