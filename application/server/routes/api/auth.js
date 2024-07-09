const express = require("express");
const signup_controller = require("../../controllers/signupController");
const loginController = require('../controllers/loginController');
const router = express.Router();

<<<<<<< HEAD
router.get("/verify/:token", signupController.verify_email_get);
router.post("/verify/:email", signupController.verify_email_post);
router.post("/signup", signupController.signup_user_post);
router.post('/login', loginController.login_user_post);

// New routes for password reset
router.post('/forgot-password', loginController.forgot_password_post);
router.post('/reset-password', loginController.reset_password_post);
=======
router.get("/verify/:token", signup_controller.verify_email_get);
router.post("/verify/:email", signup_controller.verify_email_post);
router.post("/signup", signup_controller.signup_user_post);

router.post('/login', loginController.login_post);
>>>>>>> origin/shez-backend-dev

module.exports = router;

