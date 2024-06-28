const express = require("express");
const signup_controller = require("../../controllers/signupController");

const router = express.Router();
router.get("/verify/:token", signup_controller.verify_email_get)
router.post("/verify/:email", signup_controller.verify_email_post)
router.post("/", signup_controller.signup_user_post)

module.exports = router

