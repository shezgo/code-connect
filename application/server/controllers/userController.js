const asyncHandler = require("express-async-handler");
const boom = require("@hapi/boom");
const { User } = require("../db/models/index.js");
const { search } = require("../utils/index.js")

exports.search_challenge_get = asyncHandler(async (req, res, next) => {
    const search_query = req.params.search_query;
    // Send filter with the body
    const filter = req.body?.filter;
    const search_options = {
        search_query: search_query, // Query of the search
        search_properties: {
            userID: 1,// Weight of the column content of model challenge to fuzzy search in
            firstName: 2,
            lastName: 2,
            email: 2,
        },
        filter: filter,
        order: ["email", "ASC"],
        limit: 3 // Number of records to return
    }
    console.log(req.params.search_query);
    console.log(filter);
    console.log(search_query);


    const search_results = await search.fuzzy_search(User, search_options)

    if (search_results.length === 0) {
        search_options.search_query = "";
        search_results = await search.fuzzy_search(User, search_options);
        return res.json({ records: search_results });
    }
    res.json({ records: search_results });
});