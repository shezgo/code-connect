const express = require("express");
const search_controller= require("../../controllers/postController");
const router = express.Router();

router.get("/search/:search_query", search_controller.search_post_get);

module.exports = router;