const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeagueSchema= new Schema({
    name:{
        type: String,
        required:true,
        trim:true,
        minlength: 3
    },
    id:{
        type: String,
        required:true,
        trim:true,
        minlength: 3
    },
    Size:{
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
        required:true,
        trim:true,
        minlength: 3
    }
},
{
    timestamps:true,
});

const League = mongoose.model('League',LeagueSchema);
module.exports = League;