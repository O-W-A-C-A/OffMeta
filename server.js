  
const express = require('express');
//const Chatkit= require('@pusher/chatkit-server');
const connectDB = require('./config/db')
const app = express();
//connect Database
connectDB();
//init middleware
app.use(express.json({extended: false}));

//const chatkit = new Chatkit.default({
  //  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
   // key: process.env.CHATKIT_SUPER_DUPER_SECRET_KEY,
//});

app.get('/', (req, res)=> res.send('API RUNNING'));

//Define routes
app.use('/api/users', require('./routes/api/users'));
//app.use('/api/auth', require('../api/auth'));
//app.use('/api/profile', require('../api/profile'));
//app.use('/api/posts', require('../api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));
console.log('Hi');