const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Load League Model
const Stats = require('../../models/Stats.model');

const DIR = './backend/uploads/league-logos';

//@route GET api/stats/
//@desc Return a list of all leagues created
//@access Public
router.get('/', (req, res) => {
  Stats.find()
    .then((stats) => res.json(stats))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//@route GET api/leagues/id
//@desc Find league by ID
//@access Public
router.get('/getStats', (req, res) => {
  const player_name = req.body.player_name;
  Stats.findOne({ player_name })
    .then((league) => res.json(league))
    .catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
