const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeagueSchema= new Schema({
    leagueName:{
        type: String,
        required:true,
        trim:true,
        minlength: 3
    },
    leagueSize:{
        type: Number,
        required:true
    },
    scoringFormat:{
        type: String,
        required:true,
        trim:true,
        minlength: 3
    },
    file:{
        type: String,
        default: 'none'
    },
    draftPickTrading:{
        type: Boolean,
        default: false
    }
},
{
    timestamps:true,
});

const League = mongoose.model('League',LeagueSchema);
module.exports = League;