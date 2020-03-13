const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    Alias:{
        type: String,
        required:true,
        trim:true,
        minlength: 3
    },
    name:{
        type: String,
        required:true,
        trim:true,
        minlength: 3
    },
    Dmgdone:{
        type: Number,
        required:true,
    },
    elim:{
        type: Number,
        required:true,
    },
    Objkills:{
        type: Number,
        required:true
    },
    Assists:{
        type: Number,
        required:true
    },
    Healed:{
        type: Number,
        required:true
    },
    Role:{
        type: String,
        required:true,
        trim: true,
        minlength:3
    },
},
    {
        timestamps:true,
});
const Player = mongoose.model('Player',playerSchema);
module.exports = Player;