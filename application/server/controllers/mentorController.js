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

    try {
        // Validate and sanitize email
        if (!email || typeof email !== 'string') {
            return next(boom.badRequest('Invalid email address'));
        }

        // Find the user by email
        const user = await User.findOne({
            where: {
                email: email
            }
         });

        if (!user) {
            throw boom.unauthorized("User not found or not registered");
        }

        if (user.isMentor) {
            return next(boom.conflict('You are already a mentor'));
        }

        if (user.pendingMentor) {
            return next(boom.conflict('You have registered, please wait for a reply'));
        }
        
        // Update user status
        user.pendingMentor = true;
        await user.save();

        // Send the mentor request email
        send_mentor_request_email(email);

        res.status(200).json({
            message: 'Mentor request email has been sent successfully'
        });

    }catch (err) {
        console.error('Error in mentor requeste mail post', err);
        if (boom.isBoom(err)) {
            return next(err);
        } else {
            return next(boom.internal(err.message));
        }
    }
});