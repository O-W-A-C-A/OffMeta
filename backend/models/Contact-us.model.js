const mongoose = require('mongoose')
//Contact Schema
const contactSchema = mongoose.Schema({
    name: String,
    subject: String,
    message: String
})

const ContactUs = mongoose.model('Contact-us', contactSchema)

module.exports = ContactUs