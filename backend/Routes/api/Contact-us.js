const express = require('express')
const router = express.Router()
require('dotenv').config();
const ContactUs = require('../models/Contact-us.model')
const mailer = require('../middleware/send-mail')

const Joi = require('joi');

//message schema
const contactSchema = Joi.object.keys({
  contactName: Joi.string().required(),
  contactSubject: Joi.string().required(),
  contactMessage: Joi.string().required()
});

//send message
router.post('/contact', (req, res) => {
  try{
    const result = Joi.validate(req.body, contactSchema);
    if(result.error) {
      req.flash('error', 'All fields must have data in it.');
      req.redirect('Contact-us/contact');
      return;
    }

    const html = `${result.value.contactMessage}`

    await mailer.sendEmail(result.value.contactName, 'chrismasferrer@yahoo.com', result.value.contactSubject, html);

  } catch(error){
    res.status(400).send(error)
  }
})