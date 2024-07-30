const express = require("express");
const leaderboard_controller = require("../../controllers/leaderboardController");
const router = express.Router();
const { sequelize } = require("../../db/index");

const app = express();

app.use(express.json());

router.get("/leaderboard", leaderboard_controller.retrieve_leaderboard_get);

module.exports = router;