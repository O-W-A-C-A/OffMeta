const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//League Schema
const LeagueSchema = new Schema(
  {
    leagueName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    leagueSize: {
      type: Number,
      required: true,
    },
    scoringFormat: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: Object,
    },
    //invite user to league start
    draftPickTrading: {
      type: Boolean,
      default: false,
    },
    playerdatabase: [mongoose.Schema.Types.Mixed],
    createdBy: {
      type: String,
    },
    leaguePlayers: {
      playerID: { type: String, trim: true },
      playerName: { type: String, trim: true },
      playerImg: { type: String, trim: true },
      ownerID: { type: String, trim: true },
      teamName: { type: String, trim: true },
      role: { type: String, trim: true },
      total: { type: String, trim: true },
      eliminations: {
        type: Number,
      },
      damage_done: {
        type: Number,
      },
      obj_time: {
        type: Number,
      },
      damage_absorbed: {
        type: Number,
      },
      assists: {
        type: Number,
      },
      ultimates_earn: {
        type: Number,
      },
      deaths: {
        type: Number,
      },
      healing: {
        type: Number,
      },
      leagueID: { type: String, trim: true },
    },
    createdBy: {
      type: String,
    },
    //saving user info league schema
    members: [
      {
        id: { type: mongoose.Types.ObjectId },
        name: { type: String, trim: true },
        email: { type: String, trim: true },
        total: { type: Number },
      },
    ],
    joinCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const League = mongoose.model('League', LeagueSchema);
module.exports = League;