const express = require("express");
const inbox_controller = require("../../controllers/inboxController");
const router = express.Router();
const dotenv = require('dotenv');
const { sequelize } = require("../../db/index");
const app = require('express');

app.use(express.json());

router.post("/inbox/:messageID", inbox_controller.inbox_message_post);
router.get("/inbox/:messageID", inbox_controller.inbox_message_get);

module.exports = router;