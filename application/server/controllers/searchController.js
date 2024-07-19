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
        host = DATABASE_HOST,
        dialect = DATABASE_DIALECT,
    },

);

sequelize.query('SELECT * FROM user WHERE userID LIKE %' + searchTerm + '%', {
    type: Sequelize.QueryTypes.SELECT
}).then(res => {
    console.log(res);
    return res.json();
}).catch(error => {
    console.error('Error with query: ' + error);
});

