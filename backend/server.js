  
const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const Chatkit= require('@pusher/chatkit-server');

require('dotenv').config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SUPER_DUPER_SECRET_KEY,
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection;
 connection.once('open', () => {
     console.log("MongoDB database connection established successfully");
 })

 const userRouter = require('./Routes/User');
 const playerRouter= require('./Routes/Players');
 const leagueRouter=require('./Routes/League');
 const imageRouter=require('./Routes/image');

 app.use(userRouter );
 app.use(playerRouter );
 app.use(leagueRouter);
 app.use(imageRouter);

app.listen(port, () => {
    console.log('Server is running on port : ',port);
});