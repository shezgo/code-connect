const asyncHandler = require("express-async-handler");
const boom = require("@hapi/boom");
const { Post } = require("../db/models/index.js");
const { search } = require("../utils/index.js")

exports.search_post_get = asyncHandler(async (req, res, next) => {
    const search_query = req.params.search_query;
    // Send filter with the body
    const filter = req.body?.filter;
    const search_options = {
        search_query: search_query, // Query of the search
        search_properties: {
            content: 1, // Weight of the column content of model post to fuzzy search in
            //postID,
            //userID,
        }, 
        filter: filter,
        order: ["postID", "DESC"],
        limit:10 // Number of records to return
    }
    
    const search_results = await search.fuzzy_search(Post, search_options);
    res.json({ records: search_results });     
});

