const Fuse = require('fuse.js');
const asyncHandler = require("express-async-handler");
const { Post } = require("../db/models/index");
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


exports.search_post_data = asyncHandler(async (req, res) => {
    const searchTerm = req.params.searchTerm;
    const sortField = req.query.sortField || 'content';
    const sortDirection = req.query.sortDirection || 'asc';
    console.log(searchTerm);
    try {
        //Return all items. change the key fields if you need more data
        const [results] = await sequelize.query('SELECT postID, content, codeBlock FROM post LIMIT 10');

        //extract just the emails and make a map of them
        const posts = results.map(results => ({
            postID: results.postID,
            content: results.content,
            codeBlock: results.codeBlock
        }));

        //alphabetical sort
        posts.sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        //Fuzzy search the map.
        const options = {
            keys: [
                "postID",
                { name: "content", weight: 2 },
                //{ name: "username", weight: 3 }
                //add more fields above this line.
            ]
        };
        const fuse = new Fuse(posts, options);
        const searchResults = fuse.search(searchTerm);

        if (searchResults.length === 0) {
            const topResults = posts.slice(0, 3);
            return res.json(topResults);
        }
        return res.json(searchResults);

        //return res.json(sortedJSON);
    } catch (error) {
        console.error('Error with query: ' + error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});