const express = require('express')
const User = require('../models/User.model')
const auth = require('../middleware/auth')
require('dotenv').config();
const router = express.Router()
const randomstring = require('randomstring')
const mailer = require('../middleware/send-mail')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const SchemaObject = require('node-schema-object')

//router.route.post('/users/add', async (req, res) => {
router.post('/users/add', async (req, res) =>{
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()

        //create user authentication code
        const confirmCode = randomstring.generate(12);
        //save user authentication code to db
        user.confirmCode = confirmCode;
        //flag account as unverified
        user.verified = false;

        //compose email
        const html = `Hello,
        <br/>
        Thanks for registering with Offmeta.
        <br/><br/>
        To verify your account please use the following code:
        <br/>
        Verification Code: <b>${confirmCode}</b>
        <br/>
        Through this link to activate your account:
        <a href="http://localhost:3000/verify">http://localhost:3000/verify</a>`
        //send email
        await mailer.sendEmail('owacatm@gmail.com', user.email, 'Offmeta account verification', html);

        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/users/contact', async(req, res) => {
    try
    {
        console.log('Data: ', req.body);
        res.json({ message: 'Message received!' })

        const tempSchema = new SchemaObject({
            contactEmail: String,
            contactSubject: String,
            contactMessage: String
        });

        const contact = new tempSchema(req.body);
        
        const html = `${contact.contactMessage}`
        await mailer.sendEmail(contact.contactEmail, 'owacatm@gmail.com', contact.contactSubject, html);
    }
    catch(error)
    {
        res.status(400).send(error)
    }
});

//send an invite email
router.post('/users/invite', async(req, res) => {
    try{
        const name = req.body
        const user = await User.findByCredentials(name)
        if(!user) {
            return res.status(401).send({error: 'This user does not exist'})
        }
        const html = `Hello there,
        <br/>
        This is an Offmeta invitation
        <br/>
        Would you like to accept this invitation?`

        await mailer.sendEmail('owacatm@gmail.com', 'chrismasferrer@yahoo.com', 'Offmeta Invitation', html);
    } catch(error) {
        res.status(400).send(error)
    }
});

//verify user confirmCode to activate their account
router.post('/users/verify', async(req, res) => {
    try{
        const user = await User.findByCredentials(confirmCode)
        if(!user) {
            return res.status(401).send({error: 'Verification Failed! Wrong confirmation code.'})
        }

        user.verified = true;
        user.confirmCode = '';
        await user.save();
        
        req.flash('success', 'Account activated. You may now sign in.');
    } catch(error) {
        res.status(400).send(error)
    }
});

//new user login (testing)
router.post('/users/login', async(res, req) => {
    //retrieve user email from login page
    const user = users.find(user => user.email === req.body.email)
    //check if the user exists
    if(user == null) {
        return res.status(400).send('Cannot find user')
    }
    //test the password input from login page and see if it matches
    try{
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        }
        else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
});
//end of new user login
/*
router.post('/users/login', async(req, res) => {
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

}); */

router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.route('/users/:id').get((req, res)=> {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/users/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => res.json('User has been succesfully deleted.'))
    .catch(err => res.status(400).json('Error: ' +err));
})
router.route('/users/update/:id').post((req,res) => {
    User.findById(req.params.id)
    .then (user => {
        user.name = req.body.name;
        user.email= req.body.email;
        user.password = req.body.password;

        user.save()
            .then(() => res.json('User updated'))
            .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});

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
    user.findOne({
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
