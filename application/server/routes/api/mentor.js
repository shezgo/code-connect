const express = require("express");
const mentor_controller = require("../../controllers/mentorController");
const router = express.Router();

router.post("/requestMentor/:email", mentor_controller.mentor_request_email_post);

module.exports = router;
