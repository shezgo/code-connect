const express = require("express");
const signup_controller = require("../../controllers/signupController");
const login_controller = require('../../controllers/loginController');
const { getUserForums, addForum, addThread, addReply, listThread } = require('../../controllers/forumController');
const router = express.Router();
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const { sequelize } = require("../../db/index");

const jwt = require('jsonwebtoken');
const app = express();
const boom = require('@hapi/boom');

app.use(express.json());

dotenv.config();

// Session store initialization
const store = new SequelizeStore({
    db: sequelize,
});

// Session middleware configuration
router.use(session({
    secret: process.env.SESSION_SECRET, // Use a secure secret, currently "your_secure_random_string"
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1 hour
}));

//Middleware to authenticate the user's cookie token
const authCookieTok = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw boom.unauthorized("Token not found");
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, detokenized) => {
        if (err) {
            throw boom.unauthorized("Invalid token");
        }
        req.userID = detokenized.id;
        next();
    });
};


// Public routes
router.get("/verify/:token", signup_controller.verify_email_get);
router.post("/verify/:email", signup_controller.verify_email_post);
router.post("/signup", signup_controller.signup_user_post);
router.post('/login', login_controller.login_user_post);
router.post('/logout', login_controller.logout_user_post);
router.get('/getuserforums', authCookieTok, getUserForums);
router.post('/addforum', authCookieTok, addForum);
router.post('/addthread', authCookieTok, addThread);
router.post('/addreply', authCookieTok, addReply);
router.get('/listThreads', listThread);

// Protected routes tests

router.get('/protected-route', authCookieTok, (req, res) => {
    res.json({ message: "This is a protected route using authCookieTok", userID: req.userID });
});

// New routes for password reset
 router.post('/forgot-password', login_controller.forgot_password_post);
 router.post('/reset-password', login_controller.reset_password_post);

module.exports = router;

