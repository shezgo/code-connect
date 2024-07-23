const asyncHandler = require("express-async-handler");
const boom = require("@hapi/boom");
const { AllEntities } = require("../db/models/index.js");
const { search } = require("../utils/index.js")

exports.search_get = asyncHandler(async (req, res, next) => {
    const search_query = req.params.searchTerm;
    // Send filter with the body
    const filter = req.body?.filter;
    const search_options = {
        search_query: search_query, // Query of the search
        search_properties: {
            title: 1, // Weight of the column content of model challenge to fuzzy search in
            description: 1,
        },
        filter: filter,
        order: ["title", "DESC"],
        limit: 3 // Number of records to return
    }

    const search_results = await search.fuzzy_search(AllEntities, search_options)
    res.json({ records: search_results });
});