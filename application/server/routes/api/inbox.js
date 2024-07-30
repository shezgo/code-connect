const express = require("express");
const inbox_controller = require("../../controllers/inboxController");
const router = express.Router();
const dotenv = require('dotenv');
const { sequelize } = require("../../db/index");
const app = express();

app.use(express.json());

router.post("/send", inbox_controller.inbox_message_post);
router.get("/", inbox_controller.inbox_message_get);

module.exports = router;