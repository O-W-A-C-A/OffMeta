const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//League Schema
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
    },
    logo:{
        type:Object
    },
    //invite user to league start
    createdBy:{
        type:String
    },
   
    members: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
},
{
    timestamps:true,
});

const League = mongoose.model('League',LeagueSchema);
module.exports = League;