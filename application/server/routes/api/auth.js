const express = require("express");

const signup_controller = require("../../controllers/signupController");
const login_controller = require('../../controllers/loginController');
const router = express.Router();

router.get("/verify/:token", signup_controller.verify_email_get);
router.post("/verify/:email", signup_controller.verify_email_post);
router.post("/signup", signup_controller.signup_user_post);
router.post('/login', login_controller.login_user_post);

// New routes for password reset
router.post('/forgot-password', login_controller.forgot_password_post);
router.post('/reset-password', login_controller.reset_password_post);



module.exports = router;

