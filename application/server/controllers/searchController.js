const asyncHandler = require("express-asyn-handler");
const { User } = require("../db/models/index");
const boom = require("@hapi/boom");
const dbConfig = require("../db/models/config");
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DATABASE_NAME,
    dbConfig.DATABASE_USER,
    dbConfig.DATABASE_PASSWORD,
    {
        host = dbConfig.DATABASE_HOST,
        dialect = dbConfig.DATABASE_DIALECT,
    },

);

exports.search_user_data = asyncHandler(async (req, res) => {
    const { searchTerm } = req.body;
    sequelize.query('SELECT * FROM user WHERE userID LIKE %' + searchTerm + '%', {
        type: Sequelize.QueryTypes.SELECT
    }).then(res => {
        console.log(res);
        return res.json();
    }).catch(error => {
        console.error('Error with query: ' + error);
    });
});