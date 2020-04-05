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
    logo:{
        type:Object
    },
    draftPickTrading:{
        type: Boolean,
        default: false
    },
    createdBy:{
        type:String
    }
},
{
    timestamps:true,
});

const League = mongoose.model('League',LeagueSchema);
module.exports = League;