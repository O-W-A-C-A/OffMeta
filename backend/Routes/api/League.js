const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

//Load League Model
const League = require('../../models/League.model');

const DIR = './backend/uploads/league-logos';

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
router.post("/create", (req,res) => {
   const leagueName = req.body.leagueName;
   const leagueSize = Number(req.body.leagueSize);
   const scoringFormat = req.body.scoringFormat;
   const logo = req.body.logo;
   //boolean values do not require double quotes
   const draftPickTrading = Boolean(req.body.allowDraftTrading);
    
    const newLeague = new League({
        leagueName,
        leagueSize,
        scoringFormat,
        draftPickTrading});

    newLeague.save()
    .then(() => res.json('League Created!'))
    .catch(err => res.status(400).json('Error: '+ err));
    
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

// @route PUT api/leagues/uploadimage/:id
// @desc Allow user to update their profile image
// @access Public
router.put("/uploadimage/:id", upload.single('leagueLogo'), (req, res, next) => {
   
    League.findById(req.params.id)
    .then (league => {
        league.file = req.file.filename;
        console.log(req.file)
        league.save()
        .then(() => res.json('League Logo image updated'))
        .catch(err => res.status(400).json('Error: ' +err));
})
.catch(err => res.status(400).json('Error: '+ err));
});

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


module.exports = router;