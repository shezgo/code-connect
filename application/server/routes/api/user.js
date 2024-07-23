const express = require("express");
const search_controller = require("../../controllers/userController");
const router = express.Router();

router.get("/search/:search_query", search_controller.search_challenge_get);

module.exports = router;