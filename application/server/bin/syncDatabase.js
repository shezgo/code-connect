const { initialize } = require("../db/index.js");

const force = process.env.npm_config_force ? process.env.npm_config_force : "false"

const sync_database = async ()=>{

    try {
        const {sequelize, db} = await initialize();
      // await sequelize.authenticate();
      // console.log('Connection to the database has been established successfully.');
      // stop foreign key constraints with force
      if(force==="true") {
        await sequelize.query("SET foreign_key_checks = 0;")
      } 
      
        
        
        console.log("creating views")
        // Create Database model views that have createView function and are not sync
        const views = [];
        sequelize.modelManager.models.forEach(async m => {
          
            if (m.options.doNotSync) {
              
            }    
            else{
              await m.sync({ force: force==="true"? true: false });
            }          
        });

        console.log('Database synchronized successfully.');
        await sequelize.query("SET foreign_key_checks = 1;")
        // Additional sync or setup logic here if needed
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
    
(async () => await sync_database())();

module.exports = sync_database;

return 0;