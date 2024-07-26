const express = require("express");
const search_controller = require("../../controllers/searchController");
const router = express.Router();
const { sequelize } = require("../../db/index");

router.get("/:searchTerm", search_controller.search_get);
//router.get("/search", search_controller.search_user_data);

module.exports = router;