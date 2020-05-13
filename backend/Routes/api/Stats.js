const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Load League Model
const Stats = require('../../models/Stats.model');

const DIR = './backend/uploads/league-logos';

//@route GET api/stats/
//@desc Return all of the players with their respective stats
//@access Public
router.get('/', (req, res) => {
  Stats.find()
    .then((stats) => res.json(stats))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//@route GET api/stats/getStats
//@desc Find player stats by name
//@access Public
router.get('/getStats', (req, res) => {
  const player_name = req.body.player_name;
  Stats.findOne({ player_name })
    .then((stats) => res.json(stats))
    .catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
