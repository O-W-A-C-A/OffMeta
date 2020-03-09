const router = require('express').Router();
let League = require('../models/League.model');

router.route('/').get((req,res)=>{
    League.find()
    .then(league => res.json(league))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req,res) => {
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
router.route('/:id').get((req, res) =>{
    League.findById(req.params.id)
        .then(league => res.json(league))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req,res)=> {
    League.findByIdAndDelete(req.params.id)
    .then(league => res.json('league deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
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
module.exports = router;