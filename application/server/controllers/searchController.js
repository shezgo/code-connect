const asyncHandler = require("express-async-handler");
const { User } = require("../db/models/index");
const boom = require("@hapi/boom");
const dbConfig = require("../db/config");
const { Sequelize, QueryTypes } = require('sequelize');

console.log("LINE 8: ", dbConfig);
const sequelize = new Sequelize(
    database = dbConfig.config.database,
    user = dbConfig.config.username,
    password = dbConfig.config.password,
    {
       host : dbConfig.config.host,
       //dialect : dbConfig.config.dialect
       dialect: "mysql"
    },
);


exports.search_user_data = asyncHandler(async (req, res) => {
    const searchTerm = req.params.searchTerm;
    console.log(searchTerm);
    try {
        const results = await sequelize.query('SELECT userID, email FROM user WHERE email LIKE :searchTerm', {
            replacements: { searchTerm: `%${searchTerm}%` },
            type: QueryTypes.SELECT
        });
        console.log("Unsorted: " + results);
        let sortedJSON = results;
        sortedJSON.sort((a, b) => (
            a.email > b.email ? 1 : -1));
        console.log("Sorted: \n" + sortedJSON);
        return res.json(sortedJSON);
    } catch (error) {
        console.error('Error with query: ' + error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
 /*   sequelize.query('SELECT userID email FROM user WHERE userID LIKE %' + searchTerm + '%', {
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