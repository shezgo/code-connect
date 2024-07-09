const express = require("express");
const signup_controller = require("../../controllers/signupController");
const loginController = require('../controllers/loginController');
const router = express.Router();

router.get("/verify/:token", signup_controller.verify_email_get);
router.post("/verify/:email", signup_controller.verify_email_post);
router.post("/signup", signup_controller.signup_user_post);

router.post('/login', loginController.login_post);

module.exports = router;

