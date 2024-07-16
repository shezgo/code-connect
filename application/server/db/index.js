const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./config.js")

//Import models here
const UserModel = require('./models/user'); 
console.log("UserModel:", UserModel);
const db = {};

const initialize = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      //Define your models here
        db.User = await new UserModel(sequelize, DataTypes);

      //Add any additional models here as needed
      // IE db.AnotherModel = require('./anothermodel')(sequelize, DataTypes);

      return { sequelize, db };
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return {};
    }
  };
module.exports = { initialize, sequelize, db };