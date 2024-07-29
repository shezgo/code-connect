const asyncHandler = require("express-async-handler");
const utils = require("../utils")
const boom = require("@hapi/boom");
const { User } = require("../db/models/index");

const send_mentor_request_email = (email) => {
    const text = `Hi!,\n\n
    Your mentor request is pending approval,We'll notify you once a decision is made.\n\n
    Best regards,\ncodeConnect`;
    
    const subject = 'Mentor Request Pending';
    utils.email.send_email(email, subject, text);
};


exports.mentor_request_email_post = asyncHandler(async (req, res, next) => {
    const email = req.params.email;

    // Find the user by email
    try {
        // Find the user by email
        const user = await User.findOne({
            where: {
                email: email
            }
         });
        // If user not found, throw unauthorized error
        if (!user) {
            throw boom.unauthorized("User not found or not registered");
        }

        console.log("userID is:"+user.userID);

        // If the user is found, update the pendingMentor field
        user.pendingMentor = true;
        await user.save();
        
        // Send the mentor request email
        send_mentor_request_email(email);

        res.send("Mentor request email sent successfully");

    }catch (err) {
        console.error(err);
        if (boom.isBoom(err)) {
            next(err);
        } else {
            next(boom.internal(err.message));
        }
    }
});