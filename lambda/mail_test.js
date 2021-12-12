const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'apocalypse2k21@gmail.com',
        pass: process.env.GOOGLE_APP_PASS
    }
});

var mailOptions = {
    from: 'apocalypse2k21@gmail.com',
    to: "agilanvlr2001@gmail.com",
    subject: 'Apocalypse Event Registration',
    html: `
    <center>
    <div>Registration Successful</div>
    <img src = "https://apocalypse-2k21.web.app/images/logo-small.png">
    </center>
    `
};

transporter.sendMail(mailOptions);

