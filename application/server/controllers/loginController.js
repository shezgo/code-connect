const asyncHandler = require("express-async-handler");
const boom = require("@hapi/boom");
const { User } = require("../db/models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
