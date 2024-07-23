// This script file will insert demo data to the database

require('dotenv').config();

const { initialize } = require("../db/index.js");
const { Post } = require("../db/models/index.js");

const seed_database = async ()=>{

    try {
        const {sequelize} = await initialize();
      
        const post_count = await Post.count();
        // Check More here https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
        if(post_count<1){
            console.log("Inserting records for post")
            const posts = await Post.bulkCreate([{
                userId: 1,
                content: "Hello World !! Inserting First Record"
            },
            {
                userId: 1,
                content: "Hello World !! Inserting Second Record"
            }],
            {
                fields:[
                    "userId",
                    "content"
                ]
            });
            console.log(posts)
        }
      
        
        console.log('Database seed inserted successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
    
(async () => await seed_database())();

module.exports = seed_database;

return 0;