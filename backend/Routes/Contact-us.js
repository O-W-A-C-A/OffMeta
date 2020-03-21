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


/*router.post('/contact', (req, res) => {
    const contact = new ContactUs(req.body)
    await contact.save();
    await mailer.sendEmail(contact.name, 'owacatm@gmail.com', contact.subject, contact.message);
})*/

// POST route from contact form
/*router.post('/contact', (req, res) => {

    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'owacatm@gmail.com',
        pass: 'OWACASeniors2020'
      }
    })
  
    // Specify what the email will look like
    const mailOpts = {
      from: req.body.name, // This is ignored by Gmail
      to: 'owacatm@gmail.com',
      subject: req.body.subject,
      text: req.body.message
    }
  
    // Attempt to send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        res.render('contact-failure') // Show a page indicating failure
      }
      else {
        res.render('contact-success') // Show a page indicating success
      }
    })
  })*/