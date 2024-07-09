const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        logging: process.env.NODE_ENV === "production" ? false : console.log,
        dialect: 'mysql',

    },
    

);
console.log("Hello from config.js")
console.log("Sequelize instance:", sequelize);
console.log("Database name:", process.env.DATABASE_NAME);
console.log("Database user:", process.env.DATABASE_USER);
console.log("Database host:", process.env.DATABASE_HOST);
console.log("Database dialect:", process.env.DATABASE_DIALECT);
module.exports = sequelize 