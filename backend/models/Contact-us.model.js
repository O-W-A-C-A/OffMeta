const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: String,
    subject: String,
    message: String
})

const ContactUs = mongoose.model('Contact-us', contactSchema)

module.exports = ContactUs