const { initialize } = require("../db/index.js");
const AllEntities = require("../db/models/allEntities.js");
const force = process.env.npm_config_force ? process.env.npm_config_force : "false";

const sync_database = async () => {
    try {
        const { sequelize, db } = await initialize();
        
        // Disable foreign key checks if required
        if (force === "true") {
            await sequelize.query("SET foreign_key_checks = 0;");
        }

        console.log("Creating views");
        // Create Database model views and synchronize models
        const views = [];
        const modelSyncPromises = [];
        const viewCreationPromises = [];

        sequelize.modelManager.models.forEach(m => {
            if (m.options.doNotSync) {
                if (m.options.ddl) {
                    views.push(m);
                }
            } else {
                modelSyncPromises.push(m.sync({ alter: true }));
            }
        });

        await Promise.all(modelSyncPromises);

        views.forEach(view => {
            viewCreationPromises.push(sequelize.query(view.options.ddl));
        });

        await Promise.all(viewCreationPromises);

        console.log('Database synchronized successfully.');

        // Re-enable foreign key checks if they were disabled
        if (force === "true") {
            await sequelize.query("SET foreign_key_checks = 1;");
        }

        // Additional sync or setup logic here if needed
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

(async () => await sync_database())();

module.exports = sync_database;