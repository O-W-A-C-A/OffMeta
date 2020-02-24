var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'owacatm@gmail.com',
        pass: 'fuckfei2020!'
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