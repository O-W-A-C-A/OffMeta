const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Messages
const MessageSchema = new Schema({
  content: {
      type: String,
      required: true
  },

  from: {
      type: String,
      required: true
  }
},

{timestamps: true});

module.exports = Message = mongoose.model('messages', MessageSchema);