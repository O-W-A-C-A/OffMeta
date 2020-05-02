const express = require("express");
const router = express.Router();
const League = require("../../models/League.model");

// @route GET api/acceptinvite/
// @desc Checks if league invite link is valid
// @access Public
router.get("/", (req, res) =>{
    const token = req.query.id;
    console.log(token)
    League.findById(token)
        .then((league) =>{
            if(league == null){//checking if league exists by checking league id
                console.error('League Invite link is invalid')
                res.status(403).send('League Invite link is invalid')
            }
            else{//set id and relay message to client
                res.status(200).send({
                    id: league.id,
                    leagueName: league.leagueName,
                    message: 'League Invite is a-okay'
                })
            }
        })
});

module.exports = router;