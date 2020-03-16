const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');

//bring in the schema model of user
const User = require('../../models/User');
// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a valid passweord').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if User exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exists' }] });
      }
      //Get users gravatars
      const avatar = gravatar.url(email, {
        s: '200',
        d: 'mm'
      });
      //creating new instance of user if email not found
      user = new User({
        name,
        email,
        avatar,
        password
      });
      //Encrypt the password

      //creating our salt the higher the more secure but slower
      const salt = await bcrypt.genSalt(10);

      //creates the hashed password
      user.password = await bcrypt.hash(password, salt);

      //saves the new user
      await user.save();

      //Return jsonwebtoken
      //payload definition
      const payload = {
        user: {
          id: user.id
        }
      };

      //signing the payload
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
