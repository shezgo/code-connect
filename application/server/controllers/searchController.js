const asyncHandler = require("express-async-handler");
const utils = require("../utils")
const boom = require("@hapi/boom")
const { User } = require("../db/models/index")

exports.find_user_post = asyncHandler(async (req, res, next) => {
    try {
        const db =
            mysql.createConnection({
                host: 'ec2-18-144-86-237.us-west-1.compute.amazonaws.com',
                user: 'admin',
                password: '1234',
                database: 'test_db',
            });

        db.connect(err => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
            } else {
                console.log('Connected to MySQL');
            }
        });
    }
    catch (err) {
        throw boom.notFound(err.message);
    }

    try {
        get('/search', (req, res) => {
            const searchTerm = req.query.term;
            if (!searchTerm) {
                return res.status(400)
                    .json(
                        {
                            error: 'Search term is required'
                        }
                    );
            }

            const query = `
    SELECT * FROM items
    WHERE username LIKE OR email LIKE?
    `;
            const searchValue = `%${searchTerm}%`;

            db.query(query, [searchValue, searchValue],
                (err, results) => {
                    if (err) {
                        console
                            .error('Error executing search query:', err);
                    }
                    res.json(results);
                });
        });
    }
    catch (err) {
        throw boom.notFound(err.message);
    }
});