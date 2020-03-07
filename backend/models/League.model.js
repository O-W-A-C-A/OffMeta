const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeagueSchema= new Schema({
    name:{
        type: String,
        required:true,
        trim:true,
        minlength: 3
    },
    size:{
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
        type: String,
        trim:true,
        minlength: 3
    },
    allowDraftTrading:{
        type: Boolean,
        default: true
    }
},
{
    timestamps:true,
});

const League = mongoose.model('League',LeagueSchema);
module.exports = League;