const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, 
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});

exports.send_email = (to_email, subject, text)=>{
    const mailConfigurations = {
        from: process.env.SMTP_USERNAME,
        to: to_email,
        subject: subject,
        text: text
    };
    
    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        // console.log(info);
        return true
    });
}
