const asyncHandler = require("express-async-handler");
const boom = require("@hapi/boom");
const { User } = require("../db/models/index");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // For generating the reset token
const utils = require("../utils"); // Import utils for email sending
const bcrypt = require("bcryptjs");// For password hashing
const { Op } = require("sequelize");

exports.login_user_post = asyncHandler(async (req, res, next) => {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({
        where: {
            [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }]
        }
    });
    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
                expiresIn: "1h"
            });
            res.json({ message: "Login successful", token: token });
        } else {
            throw boom.unauthorized("Invalid password");
        }
    } else {
        throw boom.unauthorized("User not found");
    }
});

// Utility function to send password reset emails
const sendPasswordResetEmail = (email, token) => {
    const resetLink = `${process.env.HOST_NAME}:${process.env.PORT}/api/auth/reset-password?token=${token}`;
    const text = `Hi there,\n\nPlease follow the link below to reset your password:\n\n${resetLink}\n\nThanks!`;
    const subject = 'Password Reset';

    utils.email.send_email(email, subject, text);
    console.log(`Password reset email sent to ${email}.`);
};

exports.forgot_password_post = asyncHandler(async (req, res, next) => {
    const { emailOrUsername } = req.body;
    const user = await User.findOne({
        where: {
            [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }]
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
    const { token, newPassword } = req.body;

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
    user.password = await bcrypt.hash(newPassword, 10); // Hash new password
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.send("Password reset successfully");
});