const Fuse = require('fuse.js');
const asyncHandler = require("express-async-handler");
const { challenge } = require("../db/models/index");
const boom = require("@hapi/boom");
const dbConfig = require("../db/config");
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(
    database = dbConfig.config.database,
    user = dbConfig.config.username,
    password = dbConfig.config.password,
    {
        host: dbConfig.config.host,
        dialect: "mysql"
    },
);


exports.search_challenge_data = asyncHandler(async (req, res) => {
    const searchTerm = req.params.searchTerm;
    const sortField = req.query.sortField || 'title';
    const sortDirection = req.query.sortDirection || 'asc';
    console.log(searchTerm);
    try {
        //Return all items. change the key fields if you need more data
        const [results] = await sequelize.query('SELECT challengeID, title, description, language, difficulty FROM codechallenge LIMIT 10');

        //extract just the emails and make a map of them
        const challenges = results.map(results => ({
            challangeID: results.challangeID,
            title: results.title,
            description: results.description,
            language: results.language,
            difficulty: results.difficulty
        }));

        //alphabetical sort
        challenges.sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        //Fuzzy search the map.
        const options = {
            keys: [
                { name: "title", weight: 3 },
                { name: "description", weight: 2 },
                { name: "language", weight: 1 }
                //add more fields above this line.
            ]
        };
        const fuse = new Fuse(challenges, options);
        const searchResults = fuse.search(searchTerm);

        if (searchResults.length === 0) {
            console.log("searchResults.length = 0");
            const topResults = challenges.slice(0, 3);
            return res.json(topResults);
        }
        return res.json(searchResults);

        //return res.json(sortedJSON);
    } catch (error) {
        console.error('Error with query: ' + error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});