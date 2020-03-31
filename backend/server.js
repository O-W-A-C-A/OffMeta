  //for server
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require("passport");
const cors = require('cors');

//constants for routes
const users = require("./Routes/api/User");
const leagues = require("./Routes/api/League");

const app = express();
app.use(cors());

/*
app.use(express.json());
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
app.use("/api/Leagues", leagues);


//process.env.port is Heroku's port if you choose to deploy the app there
const port = process.env.PORT || 5000;

/*
 const playerRouter= require('./Routes/Players');
 const imageRouter=require('./Routes/image');

 app.use('/player',playerRouter );
 app.use(imageRouter);
 */

const server = app.listen(port, () => 
    console.log(`Server up and running on port ${port} !`));

const io = require('socket.io').listen(server);

// Assign socket object to every request
app.use(function(req, res, next) {
    req.io = io;
    next();
});
