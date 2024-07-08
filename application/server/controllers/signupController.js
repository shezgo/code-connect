const asyncHandler = require("express-async-handler");
const utils = require("../utils")
const boom = require("@hapi/boom")
const { User } = require("../db/models/index")

//Read more about this library https://www.npmjs.com/package/check-password-strength
const { passwordStrength } = require('check-password-strength')

exports.verify_email_get = asyncHandler(async (req, res, next) => {
    try {
        const email = utils.token.get_verify_email(req.params.token);
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        user.set({
            emailVerified: true
        })
        await user.save();
        // res.send(email);
        // req.url = "/";
        res.status(301).redirect("/");
    }
    catch (err) {
        throw boom.notFound(err.message);
    }
});

const send_verify_email = (email) => {
    const token = utils.token.make_verify_token(email);
    const text = `Hi! There,\n\n
Please follow the given link to verify your email\n
${process.env.HOST_NAME}:${process.env.PORT}/api/auth/verify/${token}\n\n
Thanks`;
    const subject = 'CodeConnect Email Verification';
    utils.email.send_email(email, subject, text);

};

exports.verify_email_post = asyncHandler(async (req, res, next) => {
    const email = req.params.email;
    try {
        send_verify_email(email);
        res.send("Email sent successfully");
    }
    catch (err) {
        throw boom.internal(err.message);
    }
});

exports.signup_user_post = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const existing_user = await User.findOne({
        where: {
            email: email
        }
    });
    if (!existing_user) {
        if (passwordStrength(password).id>1){
            const user = User.build({
                email: email,
                password: password,
                emailVerified: false
            });
            
            user.save();

            try {
                send_verify_email(email)
                res.send("Email sent successfully");
            }
            catch (err) {
                throw boom.internal(err.message)
            }}
        else{
            throw boom.badData(`Password is ${passwordStrength(password).value}`)
        }
    }
    else {
        throw boom.badData("Email already in use")
    }
});