const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    debug: true,
    secure: true, 
    auth: {
        user: "codeconnectemail@gmail.com",
        pass: "ivjq csmb advi fnel"
    },

});

console.log("Transporter Configuration:");
console.log(transporter.options);

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
