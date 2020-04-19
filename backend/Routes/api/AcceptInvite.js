const express = require("express");
const router = express.Router();
const League = require("../../models/League.model");

// @route GET api/
// @desc Checks if league invite link is valid
// @access Public
router.get("/", (req, res) =>{
    const token = req.query.id;
    console.log(token)
    League.findById(token)
        .then((league) =>{
            if(league == null){
                console.error('League Invite link is invalid')
                res.status(403).send('League Invite link is invalid')
            }
            else{
                res.status(200).send({
                    message: 'League Invite is a-okay'
                })
            }
        })
});

module.exports = router;