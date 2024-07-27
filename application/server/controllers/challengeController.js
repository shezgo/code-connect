const asyncHandler = require("express-async-handler");
const boom = require("@hapi/boom");
const { CodeChallenge } = require("../db/models/index.js");
const { search } = require("../utils/index.js")

exports.search_challenge_get = asyncHandler(async (req, res, next) => {
    const search_query = req.params.searchTerm;
    // Send filter with the body
    const filter = req.body?.filter;
    const search_options = {
        search_query: search_query, // Query of the search
        search_properties: {
            title: 2,
            description: 2,
        },
        filter: filter,
        order: ["title", "DESC"],
        limit: 3 // Number of records to return
    }
    const search_results = await search.fuzzy_search(CodeChallenge, search_options)
    res.json({ records: search_results });
});