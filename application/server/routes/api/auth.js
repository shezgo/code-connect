const express = require("express");
const signup_controller = require("../../controllers/signupController");
const loginController = require('../controllers/loginController');
const router = express.Router();

router.get("/verify/:token", signupController.verify_email_get);
router.post("/verify/:email", signupController.verify_email_post);
router.post("/signup", signupController.signup_user_post);
router.post('/login', loginController.login_user_post);

// New routes for password reset
router.post('/forgot-password', loginController.forgot_password_post);
router.post('/reset-password', loginController.reset_password_post);

module.exports = router;

