// This script file will insert demo data to the database

require('dotenv').config();

const { initialize } = require("../db/index.js");
const { Post, CodeChallenge } = require("../db/models/index.js");

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
        
        const challenge_count = await CodeChallenge.count();
        // Check More here https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
        if(challenge_count<1){
            console.log("Inserting records for CodeChallenge")
            const challenges = await CodeChallenge.bulkCreate([{
                title:"Test Python Code Challange 1",
                description: "Test Description",
                language:"python",
                difficulty:"hard",
                codingBlock: "console.log('Hello World !');",
                deadline:"Tommorrow",
                completionPoints:"10",
                solutions:'["console.log(\'Hello World !\')"]',
                codingTests:"true",
                pseudocodeHint:"Hint"
            },
            {
                title:"Test Javacript Code Challange Second",
                description: "Test Description",
                language:"javascript",
                difficulty:"hard",
                codingBlock: "console.log('Hello World !');",
                deadline:"Tommorrow",
                completionPoints:"10",
                solutions:'["console.log(\'Hello World !\')"]',
                codingTests:"true",
                pseudocodeHint:"Hint"
            },],
            {
                fields:[
                    "title",
                    "description",
                    "language",
                    "difficulty",
                    "codingBlock",
                    "deadline",
                    "completionPoints",
                    "solutions",
                    "codingTests",
                    "codingTests"
                ]
            });
            console.log(challenges)
        }
        
        console.log('Database seed inserted successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
    
(async () => await seed_database())();

module.exports = seed_database;

return 0;