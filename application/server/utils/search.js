// This module contains search utilities
const { Op, where } = require("sequelize");
const Fuse = require('fuse.js')
/*
Basic options can be
{
    search_query: "", // Query of the search
    search_properties:{
        colName: 0.1 // Weight of the column to fuzzy search in
    }, 
    filter: {
        colName: ["value1", "value2"] // Filter values for each column
    },
    order: ['colName', 'DESC'], // Column name and sort direction can be ASC | DESC
    limit: 3 // Number of records to return
}
*/

const default_options = {
    // These fields are required and can not be set using defualts
    // search_query: "",
    // search_properties:{
    //     col1: 0.1
    // }, 
    filter: undefined,
    // Sort by defualt according to newly created records - :( But was stopped for new models -, this column gets created by sequelize automatically for every table
    order: ["createdAt","DESC"], 
    limit: 3
}


exports.fuzzy_search = async (model, options)=>{
    
    const {
        search_query,
        search_properties,
        filter,
        order,
        limit
    } = Object.assign(default_options, options);
    // For more details about querying https://sequelize.org/docs/v6/core-concepts/model-querying-basics/ 
    let where_filter = undefined
    
    if (filter!== undefined){
        // if filter are used, reduce the keys of the object to a list of 'and' of attribute in conditions
        where_filter = Object.keys(filter).reduce(
            (accumulator, key)=>{
                return accumulator.push({
                    key: {
                        [Op.in]: filter[key]
                }
            })
            }
        ,  [])
    }
    

    const results = await model.findAll({
        where: where_filter, 
        raw : true, // This will return a simple object
        order: [order] // get result as simple objects
    });

    // Map all search properties to a object list of name and weight
    const fuse_keys = Object.keys(search_properties).map((key)=>{
        return {
            "name": key,
            "weight": search_properties[key]
        }
    })

    // Check More about Fuse Options here https://www.fusejs.io/api/options.html#basic-options
    const fuse_option = {
        includeScore: true,
        threshold:0.4,
        findAllMatches: true, // Find All matches
        keys: fuse_keys
      }

    const fuse = new Fuse(results, fuse_option)
    
    const search_results = fuse.search(search_query)
    // if no results found return top results according to sort
    if(search_results.length < 1){
        return results.slice(0, limit)
    }
    return search_results.slice(0, limit).map((result)=>result.item)
}