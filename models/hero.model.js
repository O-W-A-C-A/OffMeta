const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const heroSchema = new Schema({
    tag:{
        type: Number,
        required:true
        
    },
    name:{
        type: String,
        required:true
    },
    description:{
        type: String
    },
    health:{
        type: Number
    },
    armor:{
        type: Number,
        
    },
    url:{
        type:String
    }
   
},
    {
        timestamps:true,
});
const hero = mongoose.model('hero',heroSchema);
module.exports = hero;