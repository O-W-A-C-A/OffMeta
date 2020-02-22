const express = require('express')
const User = require('../models/User.model')
const auth = require('../middleware/auth')
require('dotenv').config();
const router = express.Router()

//router.route.post('/add', async (req, res) => {
router.post('/add',async(req,res)=>{
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

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

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

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
