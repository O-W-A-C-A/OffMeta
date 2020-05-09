const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    playerID:{
        type: String,
        required:true,
    },
    playerName:{
        type: String,
        required:true,
    },
    playerImg:{
        type: String,
        required:true,
    },
    ownerID:{
        type: String,
        required:true,
    },
},
    {
        timestamps:true,
});
const Player = mongoose.model('Player',playerSchema);
module.exports = Player;