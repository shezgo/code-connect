require('dotenv').config();
const initialize = require("../db/index.js")
const sync_database = async ()=>{
    const {sequelize} = await initialize();
    console.log("Starting Sync Process !");
    await sequelize.sync({ alter: true });
    console.log("Sync Process is done !");
    return 0;
}
(async () => await sync_database())();