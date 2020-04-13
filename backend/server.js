  //for server
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require("passport");
const cors = require('cors');

const router = express.Router();
const server = require("http").Server(app);
const io = require("socket.io")(server);

//constants for routes
const users = require("./Routes/api/User");
const leagues = require("./Routes/api/League");
const resetPassword = require("./Routes/api/ResetPassword");

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
app.use("/", router);
app.use("/api/Users", users);
app.use("/api/Leagues", leagues);
app.use('/uploads', express.static('uploads'));
app.use('/uploads/league-logos', express.static('logos'));
app.use("/api/reset", resetPassword);

//process.env.port is Heroku's port if you choose to deploy the app there
const port = process.env.PORT || 5000;

/*
 const playerRouter= require('./Routes/Players');
 app.use('/player',playerRouter );
 */


//ROUTES WILL GO HERE
app.get('/', (req, res) => {
    res.json({ message: 'WELCOME TO OFFMETA BACKEND' });   
});

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

server.listen(port, () => 
    console.log(`Server up and running on port ${port} !`));

io.on("connection", socket => {
    const { id } = socket.client;
    console.log(`User connected: ${id}`);

    socket.on("chat message", ({ name, message }) => {
        io.emit("chat message", { name, message });
        console.log(message);
      });
          
});




    