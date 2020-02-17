const router = require('express').Router();
let User = require('../models/User.model');

router.route('/').get((req,res)=>{
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/')
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    //const ProfileImage = req.body.ProfileImage;
    //const Date = Date.parse(req.body.Date);
   // const firstname = req.body.firstname;
   // const lastname = req.body.lastname;
    
    const newUser = new User({username,
        password,email});

    newUser.save()
    .then(() => res.json('User Added!'))
    .catch(err => res.status(400).json('Error: '+ err));

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if(!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) =>{
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })

});

router.route('/:id').get((req, res)=> {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => res.json('User has been succesfully deleted.'))
    .catch(err => res.status(400).json('Error: ' +err));
})

router.route('/update/:id').post((req, res) =>{
    User.findById(req.params.id)
   .then(user => {
   user.username = req.body.username;
   user.password = req.body.password;
   user.email = req.body.email;
   //User.ProfileImage = req.body.ProfileImage;
    //User.Date = Date.parse(req.body.Date);
    //User.firstname = req.body.firstname;
   // User.lastname = req.body.lastname;

    user.save()
    .then(() => res.json('User Updated'))
    .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/login').post((req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    username: user.username,
                    password: user.password,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            }else{
                res.json({error: "User does not exist"})
            }
        }else{
            res.json({error: "User does not exist"})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

module.exports = router;
