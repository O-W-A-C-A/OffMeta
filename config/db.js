const mongoose = require('mongoose')
//varable that points to my config folder
const config = require('config');
//allows us to get to mongo string URI from the config folder
const db = config.get('MONGODB_URI')

const connectDB = async() =>{
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });
        
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        //exit process with failure 1
        process.exit(1);
    }
};

module.exports = connectDB;
