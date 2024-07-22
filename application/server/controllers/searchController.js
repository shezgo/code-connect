const Fuse = require('fuse.js');
const asyncHandler = require("express-async-handler");
const { User } = require("../db/models/index");
const boom = require("@hapi/boom");
const dbConfig = require("../db/config");
const { Sequelize, QueryTypes } = require('sequelize');
const { search } = require('../routes/api/auth');

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
    const sortField = req.query.sortField || 'email';
    const sortDirection = req.query.sortDirection || 'asc';
    console.log(searchTerm);
    try {
        //Find the subset of the search.
        //const results = await sequelize.query('SELECT userID, email FROM user WHERE email LIKE :searchTerm', {
        //    replacements: { searchTerm: `%${searchTerm}%` },
        //    type: QueryTypes.SELECT
        //});

        //Return all users. change the key fields if you need more data
        const [results] = await sequelize.query('SELECT userID, email FROM user');

        //extract just the emails and make a map of them
        const users = results.map(results => ({
            userID: results.userID,
            email: results.email,
            //username: results.username,
        }));

        users.sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        //const sortedJSON = emails.map(email => ({ email }));

        //Sorting the returned subset
        //console.log("Unsorted: " + results);
        //let sortedJSON = results;
        //sortedJSON.sort((a, b) => (
        //    a.email > b.email ? 1 : -1));
        //console.log("Sorted: " + sortedJSON);

        //Fuzzy search the map.
        const options = {
            keys: [
                "userID",
                { name: "email", weight: 2 },
                //{ name: "username", weight: 3 }
                //add more fields above this line.
            ]
        };
        const fuse = new Fuse(users, options);
        const searchResults = fuse.search(searchTerm);

        if (searchResults.length === 0) {
            const topResults = users.slice(0, 3);
            return res.json(topResults);
        }
        return res.json(searchResults);

        //return res.json(sortedJSON);
    } catch (error) {
        console.error('Error with query: ' + error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});