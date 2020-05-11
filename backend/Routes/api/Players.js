let Player = require('../../models/Player.model');
const axios = require('axios');
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

router.route('/').get((req, res) => {
  Player.find()
    .then((player) => res.json(player))
    .catch((err) => res.status(400).json('Error: ' + err));
});


try {
  axios
    .get('https://api.overwatchleague.com/players/4639')
    .then((response) => {
      var handles = new String(response.data.content.handle);
      var names = new String (response.data.content.giveName);
      var familynames= new String(response.data.content.familyName);
      console.log(handles);
      console.log(names);
      console.log(familynames);
    })
    .catch(console.error);
} catch (error) {
  console.log(error);
}

module.exports = router;
