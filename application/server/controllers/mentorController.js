const asyncHandler = require("express-async-handler");
const utils = require("../utils")
const boom = require("@hapi/boom");

const send_mentor_request_email = (email) => {
    const text = `Hi! [Recipient's Name],\n\n
    Your mentor request is pending approval,We'll notify you once a decision is made.\n\n
    Best regards,\ncodeConnect`;
    
    const subject = 'Mentor Request Pending';
    utils.email.send_email(email, subject, text);
};


exports.mentor_request_email_post = asyncHandler(async (req, res, next) => {
    const email = req.params.email;
    try {
        send_mentor_request_email(email);
        res.send("Mentor request Email sent successfully");
    }
    catch (err) {
        throw boom.internal(err.message);
    }
});