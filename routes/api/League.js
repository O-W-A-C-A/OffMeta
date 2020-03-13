const router = require('express').Router();
let League = require('../../models/League.model');

router.route('/').get((req,res)=>{
    League.find()
    .then(league => res.json(league))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/')
router.route('/add').post((req,res) => {
   const name = req.body.name;
   const id = req.body.id;
   const Size = Number(req.body.Size);
   const scoringFormat = req.body.name;
   const logo = req.body.logo;
    
    const newLeague = new League({
        name,
        id,
        Size,
        scoringFormat,
        logo});

    newLeague.save()
    .then(() => res.json('League Added!'))
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
        league.name = req.body.name;
        //league.Size = req.body.Size;
        //league.scoringFormat = Number(req.body.scoringFormat);

        league.save()
        .then(() => res.json('league updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;