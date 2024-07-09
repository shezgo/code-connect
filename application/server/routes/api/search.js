const express = require('express');
const search_controller = require("../../controllers/searchController");
const mysql = require('mysql8');

const app = express();
const port = 3306;

const router = express.Router();
router.get()