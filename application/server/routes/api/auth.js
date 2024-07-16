const express = require("express");
const signup_controller = require("../../controllers/signupController");
const login_controller = require('../../controllers/loginController');
const router = express.Router();
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const { sequelize } = require("../../db/index");

const jwt = require('jsonwebtoken');
const app = express();

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

// Authentication middleware test
const authMiddleware = (req, res, next) => {
    console.log("req.session.userID is: ", req.session.userID);
    if (req.session.userID) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

//JWT middleware test
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        req.user = user; // Store the user data in the request object
        next();
    });
};

// Public routes
router.get("/verify/:token", signup_controller.verify_email_get);
router.post("/verify/:email", signup_controller.verify_email_post);
router.post("/signup", signup_controller.signup_user_post);
router.post('/login', login_controller.login_user_post);

// Protected routes tests
 router.get('/protected-route', authMiddleware, (req, res) => {
     res.json({ message: "You are authenticated" });
 });

app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: "This is a protected route using JWT", user: req.user });
});

// New routes for password reset
// router.post('/forgot-password', login_controller.forgot_password_post);
// router.post('/reset-password', login_controller.reset_password_post);

module.exports = router;
