const asyncHandler = require("express-async-handler");
const { User } = require("../db/models/index");
const boom = require("@hapi/boom");
const dbConfig = require("../db/config");
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(
    database = dbConfig.DATABASE_NAME,
    user = dbConfig.DATABASE_USER,
    password = dbConfig.DATABASE_PASSWORD,
    {
        host : dbConfig.DATABASE_HOST,
       //dialect : dbConfig.DATABASE_DIALECT,
        dialect: "mysql"
    },

);

exports.search_user_data = asyncHandler(async (req, res) => {
    const { searchTerm } = req.body;
    console.log(req);
    try {
        const results = await sequelize.query('SELECT * FROM user WHERE userID LIKE :searchTerm', {
            replacements: { searchTerm: `%${searchTerm}%` },
            type: QueryTypes.SELECT
        });
        console.log(results);
        return res.json(results);
    } catch (error) {
        console.error('Error with query: ' + error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
 /*   sequelize.query('SELECT * FROM user WHERE userID LIKE %' + searchTerm + '%', {
        type: Sequelize.QueryTypes.SELECT
    }).then(res => {
        replacements: [ password ];
        console.log(res);
        //return res.json();
    }).catch(error => {
        console.error('Error with query: ' + error);
        //return error.json();
    });
    */
});