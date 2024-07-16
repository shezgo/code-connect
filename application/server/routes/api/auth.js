const express = require("express");
const signup_controller = require("../../controllers/signupController");
const login_controller = require('../../controllers/loginController');
const router = express.Router();
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const { sequelize } = require("../../db/index");

dotenv.config();

// Session store initialization
const store = new SequelizeStore({
    db: sequelize,
});

// Session middleware configuration
router.use(session({
    secret: process.env.SESSION_SECRET, // Use a secure secret
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1 hour
}));

// Authentication middleware
const authMiddleware = (req, res, next) => {
    console.log("req.session.userID is: ", req.session.userID);
    if (req.session.userID) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// Public routes
router.get("/verify/:token", signup_controller.verify_email_get);
router.post("/verify/:email", signup_controller.verify_email_post);
router.post("/signup", signup_controller.signup_user_post);
router.post('/login', login_controller.login_user_post);

// Protected routes example
 router.get('/protected-route', authMiddleware, (req, res) => {
     res.json({ message: "You are authenticated" });
 });

// New routes for password reset
// router.post('/forgot-password', login_controller.forgot_password_post);
// router.post('/reset-password', login_controller.reset_password_post);

module.exports = router;
