const router = require('express').Router();
let Player = require('../../models/Player.model');

router.route('/').get((req,res)=>{
    Player.find()
    .then(player => res.json(player))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/')

router.route('/add').post((req,res) => {
    const Alias = req.body.Alias;
    const name = req.body.name;
    const Dmgdone = Number(req.body.Dmgdone);
    const Elim = Number(req.body.Elim);
    const Objkills = Number(req.body.Number);
    const Assists= Number(req.body.Assists);
    const Healed = Number(req.body.Healed);
    const Role = req.body.Role;
    
    const newPlayer = new Player({
        Alias,
        name,
        Dmgdone,
        Elim,
        Objkills,
        Assists,
        Healed,
        Role});

    newPlayer.save()
        .then(() => res.json('Player Added!'))
        .catch(err => res.status(400).json('Error: '+ err));
    
});

router.route('/:id').get((req, res) =>{
    Player.findById(req.params.id)
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req,res)=> {
    Player.findByIdAndDelete(req.params.id)
    .then(player => res.json('player deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    Player.findById(req.params.id)
    .then(player =>{
        player.username = req.body.username;
        player.description = req.body.description;
        player.duration = Number(req.body.duration);
        player.date = Date.parse(req.body.date);

        player.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
