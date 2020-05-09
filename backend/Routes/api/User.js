const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
//const mailer = require('../middleware/send-mail');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validForgotPasswordInput = require("../../validation/reset");

//Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: 'owacatm@gmail.com',
    pass: 'OWACASeniors2020'
  }
});

// Load User model
const User = require("../../models/User.model");
// Load League model
const League = require("../../models/League.model");

const DIR = './backend/uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);//saving to DIR 
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, req.params.id+ '-' + fileName)//save user image with user id and filename
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      //only allow user to upload png jpg or jpeg
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

//@route GET api/users/
//@desc Return a list of all users created
//@access Public
router.get("/", (req, res) => {
  User.find()
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });

      //send registered user a verification email
      /*
      const token = await newUser.generateAuthToken()
      const confirmCode = randomstring.generate(12)
      newUser.confirmCode = confirmCode
      newUser.verified = false

      const html = `Hello
      <br/>
      Thanks for registering with Offmeta.
      <br/><br/>
      To verify your account please use the following code:
      <br/>
      Verification Code: <b>${confirmCode}</b>
      <br/>
      Through this link to activate your account:
      <a href="http://localhost:3000/verify">http://localhost:3000/verify</a>`
      await mailer.sendEmail('owacat@gmail.com', newUser.email, 'Offmeta account verification', html)
      */
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });

});

//user search get request
router.get('/search', async(req, res) => {
  const sent = [];
  const friends = [];
  const received = [];
  received = req.user.request;
  sent = req.user.sentRequest;
  friends = req.user.friendsList;

  User.find({name: {$ne: req.user.name}}, async(err, result) => {
    if(err) throw err;

    res.render('search', {
      result: result,
      sent: sent,
      friends: friends,
      received: received
    })
  })
})

//user search post request
router.post('/search', async(req, res) => {
  try{
    const searchfriend = req.body.searchfriend

    if(searchfriend)
    {
      const msg = '';
      if(searchfriend == req.user.name)
      {
        searchfriend = null;
      }
      
      User.find({name: searchfriend}, async(err, res) => {
        if(err) throw err;
        res.render('search', {
          result: result,
          msg: msg
        })
      })
    }
  }
  catch(error)
  {
    res.status(400).send(error)
  }
})

// @route GET api/users/:id
// @desc returns user by finding by id
// @access Public
router.get('/:id', (req,res) =>{
    User.findById(req.params.id)
        .then(userFound =>{
            if(!userFound){
                return res.status(404).end();
            }
            else{
                return res.status(200).json(userFound);
            }
        })
        .catch(err => res.status(400).json('Error: ' +err));
});

// @route PUT api/users/update/:id
// @desc Allow user to update their credentials
// @access Public
router.put("/update/:id", (req, res, next) => {
    
    User.findById(req.params.id)
    .then (user => {

      if(req.body.password != ""){
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

      // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
              user.password = hash;
              user.save()
                .then(() => res.json('User Credentials updated 1'))
                .catch(err => res.status(400).json('Error: ' +err));
        });
      });
    }
      else{
        user.name = req.body.name;
        user.email = req.body.email;

        user.save()
        .then(() => res.json('User Credentials updated 2'))
        .catch(err => res.status(400).json('Error: ' +err));
      }
})
.catch(err => res.status(400).json('Error: '+ err));
});

// @route PUT api/users/uploadimage/:id
// @desc Allow user to update their profile image
// @access Public
router.put("/uploadimage/:id", upload.single('profileImg'), (req, res, next) => {
   
    User.findById(req.params.id)
    .then (user => {
        user.file = req.file.filename;
        console.log(req.file)
        user.save()
        .then(() => res.json('User Profile image updated'))
        .catch(err => res.status(400).json('Error: ' +err));
})
.catch(err => res.status(400).json('Error: '+ err));
});

// @route GET api/users/profileimage/:id
// @desc Get's user profile picture
// @access Public
router.get("/profileimage/:id", (req,res) =>{
  User.findById(req.params.id)
  .then (user => {
    let file = user.file;
    let fileLocation = path.join(DIR, file);
    res.sendFile(`${fileLocation}`, {root: '.'})
})
.catch(err => res.status(400).json('Error: '+ err));
}); 



// @route DELETE api/users/delete/:id
// @desc delete user by id
// @access Public
router.delete("/delete/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => res.json('User has been succesfully deleted.'))
    .catch(err => res.status(400).json('Error: ' +err));
});

// @route PUT api/users/forgotpassword/
// @desc send user password reset link
// @access Public
router.put("/forgotpassword/", (req, res) =>{
  const {errors, isValid} = validForgotPasswordInput(req.body);

   // Check validation
   if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  //console.log(email)
  User.findOne({email}).then(user=>{
    //checks if user exists
    if(!user){
      return res.status(403).json({ emailnotfound: "User not found" });
    }
    else{
      //console.log(user.name)
      const token = crypto.randomBytes(20).toString('hex');

      user.resetPasswordToken = token;

      //testing expiration
      //console.log(user.resetPasswordToken)
      //console.log(user.resetPasswordExpires)

      //creating email to send user
      user.save()
      const mailOptions = {
        from: 'owacatm@gmail.com',
        to: user.email,
        subject: 'OffMeta Reset Password Requested',
        text: 'You are receiving this because you (or someone else) have requested the reset of your password.\n\n'
        + 'Please click on the following link, or paste this into your browser to complete the process: \n\n'
        +`http://localhost:3000/reset/${token}\n\n`
        + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'

      }

      transporter.sendMail(mailOptions, function(err, info){
        if(err){
          console.log(err)
        }
        else{
          console.log('Email sent: ' + info.response);
          res.status(200).json('recovery email sent');
        }
      });
    }
  });
});

// @route PUT api/users/forgotpassword/
// @desc reset user password using id
// @access Public
router.put("/resetpassword", (req, res) =>{
  const email = req.body.email;
  User.findOne({email}).then(user=>{
  
    // Check if user exists
    if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
    }
    else{
          user.password = req.body.password;
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;
                user.password = hash;
                user.save()
                  .then(() => res.json('User Password Reset!'))
                  .catch(err => res.status(400).json('Error: ' +err));
            });
          });

          const mailOptions = {
            from: 'owacatm@gmail.com',
            to: user.email,
            subject: 'OffMeta Password Has Been Reset',
            text: `Hello, ${user.name}\n\n`
            + 'Your OffMeta Account password has been reset. \n\n'    
          }

          transporter.sendMail(mailOptions, function(err, info){
            if(err){
              console.log(err)
            }
            else{
              console.log('Email sent: ' + info.response);
              res.status(200).json('password reset email sent');
            }
          });
    }

  })
});

// @route PUT api/users/leaveleague/
// @desc removes league from user's leaguesJoined object id array and that leagues member
// object id array
// @access Public
router.post("/leaveleague/", (req, res) =>{

  const leagueToLeave = req.body.leagueID;
  const user = req.body.userID;
  
  User.findById(user)
    .then(user =>{
        League.findById(leagueToLeave)
          .then(league => {
            //if user created league return error
            if(user.id === league.createdBy){
              return res.status(409).json({usererror: "League creator cannot leave league"});
            }
            //if user is not creator
            else{
                //console.log('members before '+league.members)
                league.members.remove(user.id)
                //console.log('members after '+league.members)
                league.save();
                //console.log('leagues joined before '+user.leaguesJoined)
                user.leaguesJoined.remove(league.id)
                //console.log('laegues joined after '+user.leaguesJoined)
                user.save()
                .then(() => res.json('League Member Left'))
                .catch(err => res.status(400).json('Error: ' +err));
            }
          })
    }).catch(err => res.status(400).json('Error: ' +err));
});

// @route GET api/users/getleagues
// @desc Retrieve leagues joined by a particular user
// @access Public
router.get('/getleagues/:id', (req, res) =>{
  User.findById(req.params.id)
  .then(user =>{
      if(!user){
          return res.status(404).json({usernotfound: "user not found"});
      }
      else{
          //prints out member IDs to console
          console.log(user.leaguesJoined)
          //sends leaguesJoined array commented out is send which app will treat as text/html
          //res.send(league.members);
          res.json(user.leaguesJoined)
      }
  }).catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/users/joinleague
// @desc Allow's a user to join a league using joinCode, id in param is user id
// @access Public
router.post('/joinleague/:id', (req, res) =>{
  const joinCode = req.body.joinCode;
  User.findById(req.params.id)
    .then(user =>{
      if(!user){
        return res.status(404).json({usernotfound: "user not found"});
      }
      else{
        League.findOne({joinCode})
        .then(league =>{

          if(!league){
            return res.status(404).json({leaguenotfound: "league not found"});
          }
          else{
            //function checks if user id is found in member object id array
            //returns boolean 
            var isInArray = league.members.some(function (member){
              return member.equals(user.id)
            });
            
            //check if user already exists in member list of league
            if(isInArray){
              return res.status(409).json({memberexists: "User is already a member of league"});
            }
            else{
              //console.log(league.id)
              //testing route
              //res.send('works')
              league.members.push(user);//push user id into members object id array for league
              league.save()//save information to league
              .then(() => res.json('New League Member Joined'))
              .catch(err => res.status(400).json('Error: ' + err));
              
              //added league to user's leaguesJoined object id array
              user.leaguesJoined.push(league);
              user.save()
            }
          }
        })
      }
    }).catch(err => res.status(400).json('Error: ' + err));
});

//contact page backend
/*
router.post('/contact', async(req, res) => {
    const tempSchema = new SchemaObject({
      contactEmail: String,
      contactSubject: String,
      contactMessage: String
    });

    const contact = new tempSchema(req.body);
    const html = `${contact.contactMessage}`

    await mailer.sendEmail(contact.contactEmail, 'owacat@gmail.com', contact.contactSubject, html);
});
*/

module.exports = router;

/*const express = require('express')
const User = require('../models/User.model')
const auth = require('../middleware/auth')
require('dotenv').config();
const router = express.Router()
const randomstring = require('randomstring')
const mailer = require('../middleware/send-mail')

//router.route.post('/users/add', async (req, res) => {
router.post('/users/add', async (req, res) =>{
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()

        //create user authentication code
        const confirmCode = randomstring.generate(12);
        //save user authentication code to db
        user.confirmCode = confirmCode;
        //flag account as unverified
        user.verified = false;

        //compose email
        const html = `Hello,
        <br/>
        Thanks for registering with Offmeta.
        <br/><br/>
        To verify your account please use the following code:
        <br/>
        Verification Code: <b>${confirmCode}</b>
        <br/>
        Through this link to activate your account:
        <a href="http://localhost:3000/verify">http://localhost:3000/verify</a>`
        //send email
        await mailer.sendEmail('owacatm@gmail.com', user.email, 'Offmeta account verification', html);

        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

//verify user confirmCode to activate their account
router.post('/users/verify', async(req, res) => {
    try{
        const user = await User.findByCredentials(confirmCode)
        if(!user) {
            return res.status(401).send({error: 'Verification Failed! Wrong confirmation code.'})
        }

        user.verified = true;
        user.confirmCode = '';
        await user.save();
        
        req.flash('success', 'Account activated. You may now sign in.');
    } catch(error) {
        res.status(400).send(error)
    }
});

*/
