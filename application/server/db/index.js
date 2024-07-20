const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./config.js")

//Import models here
const UserModel = require('./models/user'); 
console.log("UserModel:", UserModel);

const PostModel = require('./models/post'); 
console.log("PostModel:", PostModel);

//relation 
const User=require('./models/user.js')
const Post=require('./models/post.js')
const Message=require('./models/message.js')

Post.belongsTo(User, { foreignKey: 'userID' });
User.hasMany(Post, { foreignKey: 'userID' });

Message.belongsTo(User, { foreignKey: 'userID' });
User.hasMany(Message, { foreignKey: 'userID' });
// 

const db = {};

const initialize = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      //Define your models here
        db.User = await new UserModel(sequelize, DataTypes);

        db.Post = await new PostModel(sequelize, DataTypes);
        
      
      //Add any additional models here as needed
      // IE db.AnotherModel = require('./anothermodel')(sequelize, DataTypes);

      return { sequelize, db };
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return {};
    }
  };
module.exports = { initialize, sequelize, db };