const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const multer = require('multer');
const path = require('path');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User.model");

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

// @route POST api/users/uploadimage/:id
// @desc Allow user to update their profile image
// @access Public
router.post("/uploadimage/:id", upload.single('profileImg'), (req, res, next) => {
   
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
    console.log(user.file)
    let fileLocation = path.join(DIR, file);
    console.log(fileLocation)
    console.log( __dirname )
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
