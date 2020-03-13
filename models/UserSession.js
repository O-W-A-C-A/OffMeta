const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    userId:{
        type:String,
        default:''
    },
    email:{
        type: String,
        default:''
    },
    password:{
        type:String
    }
});

const userSession = mongoose.model('userSession', userSessionSchema)

module.exports = userSession;