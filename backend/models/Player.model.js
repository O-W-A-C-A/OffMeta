const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    id:{
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
    leagueNum:{
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