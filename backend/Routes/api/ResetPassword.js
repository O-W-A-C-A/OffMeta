
const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const auth = require("../../middleware/auth")
router.get('/', (req, res) =>{ 
    const token = req.query.resetPasswordToken;
    console.log(req.query.resetPasswordToken)
    User.findOne({resetPasswordToken: req.query.resetPasswordToken}).then((user) =>{
      if(user == null){
        console.error('Password reset link is invalid')
        res.status(403).send('Password reset link is invalid')
      }
      else{
        res.status(200).send({
          email: user.email,
          message: 'password reset link is a-okay'
        })
      }
    });
  });
  module.exports = router;
