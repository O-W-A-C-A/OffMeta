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

//bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose.Promise = global.Promise;
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

app.use('/public', express.static('public'));


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

app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
