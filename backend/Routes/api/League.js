const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
//load input validation
const validateInviteInput = require('../../validation/invite');

//Load League Model
const League = require('../../models/League.model');

//Load User Model
const User = require('../../models/User.model');

const DIR = './backend/uploads/league-logos';

//Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'owacatm@gmail.com',
    pass: 'OWACASeniors2020',
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR); //saving to DIR
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName); //save user image with user id and filename
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    //only allow user to upload png jpg or jpeg
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

//@route GET api/leagues/
//@desc Return a list of all leagues created
//@access Public
router.get('/', (req, res) => {
  League.find()
    .then((league) => res.json(league))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//@route POST api/leagues/create
//@desc Create League
//@access Public
router.post('/create', upload.single('logo'), (req, res) => {
  //creating a unique 6 character code which will allow user's to join a league when creating an account
  const token = crypto.randomBytes(3).toString('hex');

  //creating newLeague
  let newLeague = new League({
    leagueName: req.body.leagueName,
    leagueSize: Number(req.body.leagueSize),
    scoringFormat: req.body.scoringFormat,
    createdBy: req.body.createdBy, //user id of creator
    logo: req.file, //logo
    joinCode: token,
    createdBy: req.body.createdBy,
    //boolean values do not require double quotes
    draftPickTrading: Boolean(req.body.draftPickTrading),
    logo: req.file,
    leaguePlayers: [], //by default create empty array
  });
  //parse data in array to separate them into separate objects
  data = JSON.parse(req.body.playerdatabase);
  //loop through each element and push to league
  data.forEach(function (element) {
    //console.log(element)
    newLeague.playerdatabase.push(element);
  });

  User.findById(req.body.createdBy)
    .then((user) => {
      //if user does not exist
      if (!user) {
        return res.status(403).json({ idnotfound: 'User not found' });
      }
      //if user exists
      else {
        //adding new league to array of object id of leagues joined
        user.leaguesJoined.push(newLeague);
        user.save();

        //adding user who created league to list of league members
        newLeague.members.push(user);
        //saving league to database
        newLeague
          .save()
          //checking for errors
          .then(() => res.json(`New League ${req.body.leagueName} Created`))
          .catch((err) => res.status(400).json('Error: ' + err));

        //below then and catch statements causing errors
        //.then(() => res.json('User joined a new league'))
        //.catch(err => res.status(400).json('Error: ' + err));
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

//@route GET api/leagues/id
//@desc Find league by ID
//@access Public
router.get('/:id', (req, res) => {
  League.findById(req.params.id)
    .then((league) => res.json(league))
    .catch((err) => res.status(400).json('Error:' + err));
});

//@route DELETE api/leagues/id
//@desc Delete League by ID
//@access Public
router.delete('/:id', (req, res) => {
  League.findByIdAndDelete(req.params.id)
    .then((league) => res.json('league deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//@route POST api/leagues/update/id
//@desc Update League by ID
//@access Public
router.post('/update/:id', (req, res) => {
  League.findById(req.params.id)
    .then((league) => {
      league.leagueName = req.body.leagueName;
      league.leagueSize = req.body.leagueSize;
      league.scoringFormat = req.body.scoringFormat;

      league
        .save()
        .then(() => res.json('league updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route GET api/leagues/profileimage/:id
// @desc Get's user profile picture
// @access Public
router.get('/leaguelogo/:id', (req, res) => {
  League.findById(req.params.id)
    .then((league) => {
      let file = league.file;
      let fileLocation = path.join(DIR, file);
      res.sendFile(`${fileLocation}`, { root: '.' });
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route PUT api/leagues/uploadlogo/:id
// @desc Allow user to update their profile image
// @access Public
router.put('/uploadlogo/:id', upload.single('leagueLogo'), (req, res, next) => {
  League.findById(req.params.id).then((league) => {
    league.file = req.file.filename;
    console.log(req.file);
    league
      .save()
      .then(() => res.json('League Logo updated'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
});

// @route POST api/leagues/invite
// @desc Send an invite to league email to user in database
// @access Public
router.post('/invite/', (req, res) => {
  const { errors, isValid } = validateInviteInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //these are to be passed into function
  //league variables should be gathered from props
  const email = req.body.email;
  //console.log(email)
  const leagueId = req.body.id;
  //console.log(leagueId)
  const leagueName = req.body.leagueName;

  //attempting to find user in database
  User.findOne({ email })
    .then((user) => {
      //if user does not exist
      if (!user) {
        return res.status(403).json({ emailnotfound: 'User not found' });
      }
      //if they exist
      else {
        //check if league exists
        League.findById(req.body.id).then((league) => {
          //if it doesnt
          if (!league) {
            return res.status(409).json({ leaguenotfound: 'League not found' });
          }
          //if league does exists
          else {
            //function checks if user id is found in member object id array
            //returns boolean
            var isInArray = league.members.some((member) => {
              return member.equals(user.id);
            });

            //check if user already exists in member list of league
            if (isInArray) {
              //console.log('user already exists')
              return res
                .status(409)
                .json({ memberexists: 'User is already a member of league' });
            }
            //user id not found in members list send new member invite
            else {
              //creating email to send user
              const mailOptions = {
                from: 'owacatm@gmail.com',
                to: user.email,
                subject: `OffMeta you have been invited to join ${leagueName}`,
                text:
                  `To join ${leagueName} click on the following link: \n\n` +
                  `http://localhost:3000/acceptinvite/${leagueId}\n\n` +
                  'Please ignore if you dont want to accept.',
              };

              //sending email
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  //print error
                  console.log(err);
                } else {
                  //if successful
                  console.log('League Invite Sent' + info.response);
                  res.status(200).json('league invitation sent');
                }
              });
            }
          }
        });
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route PUT api/leagues/invite
// @desc After accepting invitation add user to league member lists
// @access Public
router.put('/acceptinvite', (req, res) => {
  const { errors, isValid } = validateInviteInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;

  User.findOne({ email })
    .then((user) => {
      //already checked user when sending invitation this is another check just in case
      if (!user) {
        return res.status(404).json({ emailnotfound: 'Email not found' });
      } else {
        //console.log(user.id); //testing if user id is received from searching by email
        League.findById(req.body.id).then((league) => {
          league.members.push(user); //push user id into members object id array for league
          league.save(); //save information to league

          //added league to user's leaguesJoined object id array
          user.leaguesJoined.push(league);
          user
            .save()

            .then(() => res.json('New League Member Joined'))
            .catch((err) => res.status(400).json('Error: ' + err));
        });
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route GET api/leagues/getmembers
// @desc Retrieve the list of members a part of a league
// @access Public
router.get('/getmembers/:id', (req, res) => {
  League.findById(req.params.id)
    .then((league) => {
      if (!league) {
        return res.status(404).json({ leaguenotfound: 'league not found' });
      } else {
        //prints out member IDs to console
        console.log(league.members);
        //sends members array commented out is send which app will treat as text/html
        //res.send(league.members);
        res.json(league.members);
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route GET api/leagues/getplayers/:id
// @desc Retrieve all players from api from a league
// @access Public
router.get('/getplayers/:id', (req, res) => {
  League.findById(req.params.id).then((league) => {
    if (!league) {
      return res.status(404).json({ leaguenotfound: 'league not found' });
    } else {
      res.send(league.playerdatabase[0].qb[0]);
    }
  });
});
// @route POST api/leagues/addplayer/:id
// @desc Adds players information and ownership of user to league database
// @access Public
router.post('/addplayer/:id', (req, res) => {
  League.findById(req.params.id)
    .then((league) => {
      if (!league) {
        return res.status(404).json({ leaguenotfound: 'league not found' });
      } else {
        League.updateOne(
          { _id: req.params.id },
          {
            $push: {
              leaguePlayers: {
                playerID: req.body.playerID,
                playerName: req.body.playerName,
                playerImg: req.body.playerImg,
                teamName: req.body.teamName,
                ownerID: req.body.ownerID,
              },
            },
          }
        )
          .then(() => res.json('User added new Player'))
          .catch((err) => res.status(400).json('Error: ' + err));
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});
// @route GET api/leagues/getLeaguePlayers/:id
// @desc Retrienves info from leaguePlayers ID from a specific league
// @access Public
router.get('/getleagueplayers/:id', (req, res) => {
  League.findById(req.params.id).then((league) => {
    if (!league) {
      return res.status(404).json({ leaguenotfound: 'league not found' });
    } else {
      res.json(league.leaguePlayers);
    }
  });
});

//@route POST api/leagues/dropPlayer/:id
//@desc Drop player form leaguePlayers array
//@access Public
router.post('/dropplayer/:id', (req, res) => {
  League.findById(req.params.id)
    .then((league) => {
      if (!league) {
        return res.status(404).json({ leaguenotfound: 'league not found' });
      } else {
        League.updateOne(
          //querying _id, searching and finding the one that matches
          { _id: req.params.id },
          {
            //pulls(remove) from league players, specifically looking for player id that matches id
            $pull: {
              leaguePlayers: {
                playerID: req.body.playerID,
              },
            },
          }
        )
          .then(() => res.json('User dropped new Player'))
          .catch((err) => res.status(400).json('Error: ' + err));
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
