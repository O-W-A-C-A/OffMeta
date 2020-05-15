const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    password:{
        type: String,
        required: true,
        minlength:6
    },
    date: {
        type: Date,
        default: Date.now
    },
    file:{
        type: String,
        default: 'none'
    },
    resetPasswordToken: {
        type: String,
        default: 'none'
    },
    //only want to store id and league name in user model
    leaguesJoined: [{
        id: {type: mongoose.Types.ObjectId},
        leagueName: {type: String, trim: true}
    }],
},
{
    collection: 'users'
});

module.exports = User = mongoose.model("users", UserSchema);