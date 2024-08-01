const asyncHandler = require("express-async-handler");
const boom = require("@hapi/boom");
const { User } = require("../db/models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const crypto = require('crypto');
const utils = require("../utils");
require('dotenv').config()


exports.login_user_post = asyncHandler(async (req, res, next) => {
    const { userNameOrEmail, password } = req.body;

    try{
        // Determine if the input is an email or username
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userNameOrEmail);

        // Find the user by email or username
        const user = await User.findOne({
            where: isEmail ? { email: userNameOrEmail } : { userName: userNameOrEmail }
        });

        // If user not found, throw unauthorized error
        if (!user) {
            throw boom.unauthorized("User not found");
        }

        // Check if the provided password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords match, generate a JWT token for authentication
        if (isPasswordValid) {

            // Create a session
            req.session.userID = user.userID;
            req.session.email = user.email;

            const token = jwt.sign({ id: req.session.userID }, process.env.TOKEN_SECRET, {
                expiresIn: "1h"
            });

            // Set the token in a cookie
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 3600000 // 1 hour
            });

            // Send back the token as a response
            res.json({ message: "Login successful", token: token });

        } else {
            // If passwords do not match, throw unauthorized error
            throw boom.unauthorized("Invalid password");
        }   
    }catch (err) {
        console.error('Error in mentor login controller ', err);
        if (boom.isBoom(err)) {
            return next(err);
        } else {
            return next(boom.internal(err.message));
        }
    }
    
});

// Logout user and clear the session and token
exports.logout_user_post = asyncHandler(async (req, res, next) => {
    // Clear the session data
    req.session.destroy(err => {
        if (err) {
            return next(boom.badImplementation("Failed to destroy session"));
        }
        console.log("from logout_user_post");
        // Clear the authentication token cookie
        res.clearCookie('token');

        // Respond to the client indicating the user has been logged out
        res.json({ message: "Logout successful" });
    });
});



//Send password reset email containing reset token. Passing this token and new password
//into reset_password_post successfully changes the password.
const sendPasswordResetEmail = (email, token) => {
    const resetLink = `${process.env.HOST_NAME}:${process.env.PORT}/resetpassword.html?token=${token}`;
    const text = `Hi there,\n\nPlease follow the link below to reset your password:\n\n${resetLink}\n\nThanks!`;
    const subject = 'Password Reset';

    utils.email.send_email(email, subject, text);
    console.log(`Password reset email sent to ${email}.`);
};

exports.forgot_password_post = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({
        where: {
            [Op.or]: [{ email: email }, { email: email }]
        }
    });

    if (!user) {
        throw boom.notFound("User not found");
    }

    // Generate a unique reset token (for simplicity, using a random string here)
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Store the reset token in the database for the user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send an email with the reset link to the user
    sendPasswordResetEmail(user.email, resetToken);

    res.send("Password reset email sent successfully");
});


exports.reset_password_post = asyncHandler(async (req, res, next) => {
    const { token, password } = req.body;

    // Find user by the reset token and ensure it's valid
    const user = await User.findOne({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: { [Op.gt]: Date.now() }
        }
    });

    if (!user) {
        throw boom.badRequest("Invalid or expired token");
    }

    // Update user's password and clear/reset token fields
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.send("Password reset successfully");
});

