//Used to send email to a user
const nodemailer = require('nodemailer')

//Sender email as well as the password
/*
NOTE: Can be reconfigured so the sendet email can come from another source
      At this point in time, only one sender email will be used
*/
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'owacatm@gmail.com',
        pass: 'OWACASeniors2020'
    }
});

//Command used that sends email to the user
module.exports = {
    sendEmail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({ from, subject, to, html }, (err, info) => {
                if (err) reject(err);
                resolve(info);
            });
        });
    }
}

//Original mailer
//used to send emails for testing purposes
//Do not remove until the new version is finalized
/*var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'owacatm@gmail.com',
        pass: 'OWACASeniors2020'
    }
});

var mailOptions = {
    from: 'owacatm@gmail.com',
    to: 'chrismasferrer@yahoo.com',
    subject: 'Offmeta account registration',
    text: `Verify your email and get started with Offmeta today.`
};

transporter.sendMail(mailOptions, function(error, info){
    if(error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
*/