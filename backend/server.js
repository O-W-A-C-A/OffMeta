  
const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
const connection = mongoose.connection;
 connection.once('open', () => {
     console.log("MongoDB databse connection established successfully");
 })

 const userRouter = require('./Routes/User');
 const playerRouter= require('./Routes/Players');
 const leagueRouter=require('./Routes/League');

 app.use(userRouter );
 app.use(playerRouter );
 app.use(leagueRouter);

app.listen(port, () => {
    console.log('Server is running on port : ',port);
});