  
//for server
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require("passport");

const users = require("./Routes/api/User");
//for chatkit
//const Chatkit= require('@pusher/chatkit-server');

const app = express();

/*
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
*/

//bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

/*
//for chatkut
const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SUPER_DUPER_SECRET_KEY,
});
*/

//Connect to MongoDB
mongoose
    .connect(
        db, 
            {useNewUrlParser: true, useUnifiedTopology:true}
            )
            .then(() => console.log("MongoDB Successfully Connected"))
            .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/Users", users);

//process.env.port is Heroku's port if you choose to deploy the app there
const port = process.env.PORT || 5000;

/*
 const userRouter = require('./Routes/User');
 const playerRouter= require('./Routes/Players');
 const leagueRouter=require('./Routes/League');
 const imageRouter=require('./Routes/image');

 app.use(userRouter );
 app.use('/player',playerRouter );
 app.use('/league', leagueRouter);
 app.use(imageRouter);
 */

app.listen(port, () => 
    console.log(`Server up and running on port ${port} !`));