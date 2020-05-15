const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Stats Schema
const StatsSchema = new Schema({
  player_name: {
    type: String,
  },
  eliminations: {
    type: String,
  },
  damage_done: {
    type: String,
  },
  obj_time: {
    type: String,
  },
  damage_absorbed: {
    type: String,
  },
  assists: {
    type: String,
  },
  ultimates_earn: {
    type: String,
  },
  deaths: {
    type: String,
  },
  healing: {
    type: String,
  },
  total: {
    type: String,
  },
});

const Stats = mongoose.model('Stats', StatsSchema);
module.exports = Stats;