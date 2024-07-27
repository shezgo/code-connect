const express = require("express");
const search_controller = require("../../controllers/postController");
const router = express.Router();
const { sequelize } = require("../../db/index");

router.get("/search/:searchTerm", search_controller.search_post_get);
//router.get("/search", search_controller.search_user_data);

module.exports = router;