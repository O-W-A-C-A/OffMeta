const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
//load input validation
const validateInviteInput = require("../../validation/invite");

//Load League Model
const League = require('../../models/League.model');

//Load User Model
const User = require('../../models/User.model')

const DIR = './backend/uploads/league-logos';

//Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: 'owacatm@gmail.com',
      pass: 'OWACASeniors2020'
    }
  });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);//saving to DIR 
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,fileName)//save user image with user id and filename
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

//@route GET api/leagues/
//@desc Return a list of all leagues created
//@access Public
router.get("/", (req,res)=>{
    League.find()
    .then(league => res.json(league))
    .catch(err => res.status(400).json('Error: ' + err));
});

//@route POST api/leagues/create
//@desc Create League
//@access Public
router.post("/create", upload.single('logo'), (req,res) => {
    let newLeague = new League({
        leagueName: req.body.leagueName,
        leagueSize: Number(req.body.leagueSize),
        scoringFormat: req.body.scoringFormat,
        createdBy: req.body.createdBy,
    
        logo: req.file
    });
    console.log(req.body.draftPickTrading)

     newLeague.save()
     res.send(newLeague);
});

//@route GET api/leagues/id
//@desc Find league by ID
//@access Public
router.get("/:id", (req, res) =>{
    League.findById(req.params.id)
        .then(league => res.json(league))
        .catch(err => res.status(400).json('Error:' + err));
});

//@route DELETE api/leagues/id
//@desc Delete League by ID
//@access Public
router.delete("/:id", (req,res)=> {
    League.findByIdAndDelete(req.params.id)
    .then(league => res.json('league deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//@route POST api/leagues/update/id
//@desc Update League by ID
//@access Public
router.post("/update/:id", (req, res) =>{
    League.findById(req.params.id)
    .then(league =>{
        league.leagueName = req.body.leagueName;
        league.leagueSize = req.body.leagueSize;
        league.scoringFormat = req.body.scoringFormat;

        league.save()
        .then(() => res.json('league updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

// @route GET api/leagues/profileimage/:id
// @desc Get's user profile picture
// @access Public
router.get("/leaguelogo/:id", (req,res) =>{
    League.findById(req.params.id)
    .then (league => {
        let file = league.file;
        let fileLocation = path.join(DIR, file);
        res.sendFile(`${fileLocation}`, {root: '.'})
})
.catch(err => res.status(400).json('Error: '+ err));
});

// @route PUT api/leagues/uploadlogo/:id
// @desc Allow user to update their profile image
// @access Public
router.put("/uploadlogo/:id", upload.single('leagueLogo'), (req, res, next) =>{
    League.findById(req.params.id)
        .then(league =>{
            league.file = req.file.filename;
            console.log(req.file)
            league.save()
                .then(() => res.json('League Logo updated'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
})

// @route POST api/leagues/invite
// @desc Send an invite to league email to user in database
// @access Public
router.post("/invite/", (req,res) =>{
    const {errors, isValid} = validateInviteInput(req.body);

    // Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    //these are to be passed into function
    //league variables should be gathered from props
    const email = req.body.email;
     //console.log(email)
    const leagueId = req.body.id;
    //console.log(leagueId)
    const leagueName = req.body.leagueName;

    User.findOne({email}).then(user =>{
        //if user does not exist
        if(!user){
            return res.status(403).json({emailnotfound: "User not found"});
        }
        else{
            //creating email to send user
            const mailOptions = {
                from: 'owacatm@gmail.com',
                to: user.email,
                subject: `OffMeta you have been invited to join ${leagueName}`,
                text: `To join ${leagueName} click on the following link: \n\n`
                + `http://localhost:3000/acceptinvite/${leagueId}\n\n`
                + 'Please ignore if you dont want to accept.'
            }

            //sending email
            transporter.sendMail(mailOptions, function(err, info){
                if(err){//print error
                    console.log(err)
                }
                else{//if successful
                    console.log('League Invite Sent' + info.response);
                    res.status(200).json('league invitation sent');
                }
            });
        }
    }).catch(err => res.status(400).json('Error: '+ err));

});

// @route PUT api/leagues/invite
// @desc After accepting invitation add user to league member lists
// @access Public
router.put('/acceptinvite', (req, res) =>{
    const {errors, isValid} = validateInviteInput(req.body);

    // Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;

    User.findOne({email}).then(user =>{
        //already checked user when sending invitation this is another check just in case
        if(!user){
            return res.status(404).json({emailnotfound: "Email not found"});
        }
        else{
            //console.log(user.id); //testing if user id is received from searching by email
            League.findById(req.body.id).then(league =>{
                league.members.push(user.id);//push user id into members object id array for league
                league.save()//save information to league
                .then(() => res.json('New League Member Joined'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
        }
    }).catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;