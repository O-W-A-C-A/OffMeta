const router = require('express').Router();
var ObjectId = require('mongodb').ObjectID;
let League = require('../models/League.model');

router.route('/').get((req,res)=>{
    League.find()
    .then(league => res.json(league))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/')
router.route('/league/create').post((req,res) => {
   const name = req.body.name;
   const size = Number(req.body.size);
   const scoringFormat = req.body.scoringFormat;
   const logo = req.body.logo;
   //boolean values do not require double quotes
   const allowDraftTrading = Boolean(req.body.allowDraftTrading);
    
    const newLeague = new League({
        name,
        size,
        scoringFormat,
        allowDraftTrading});

    newLeague.save()
    .then(() => res.json('League Created!'))
    .catch(err => res.status(400).json('Error: '+ err));
    
});
router.route('/league/:id').get((req, res) =>{
    League.findById(ObjectId(req.body.id))
        .then(league => res.json(league))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/league/:id').delete((req,res)=> {
    League.findByIdAndDelete(ObjectId(req.body.id))
    .then(league => res.json('league deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/league/:id').post((req, res) =>{
    League.findById(ObjectId(req.body.id))
    .then(league =>{
        league.name = req.body.name;
        league.size = req.body.size;
        league.scoringFormat = req.body.scoringFormat;

        league.save()
        .then(() => res.json('league updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;