const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./config.js")

//Import models here
const UserModel = require('./models/user'); 
console.log("UserModel:", UserModel);

const PostModel = require('./models/post'); 
UserModel.hasMany(PostModel, { foreignKey: 'userID' });
PostModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("PostModel:", PostModel);

const MessageModel = require('./models/message'); 
UserModel.hasMany(MessageModel, { foreignKey: 'userID' });
MessageModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("MessageModel:", MessageModel);

const InboxModel = require('./models/inbox'); 
UserModel.hasOne(InboxModel, { foreignKey: 'userID' });
InboxModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("InboxModel:", InboxModel);

const MessageThreadModel = require('./models/messageThread'); 
MessageModel.hasOne(MessageThreadModel, { foreignKey: 'messageID' });
MessageThreadModel.belongsTo(MessageModel, { foreignKey: 'messageID' });
console.log("MessageThreadModel:", MessageThreadModel);

const ProfileModel = require('./models/profile'); 
UserModel.hasOne(ProfileModel, { foreignKey: 'userID' });
ProfileModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("ProfileModel:", ProfileModel);


const ExternalLinksModel = require('./models/externalLinks'); 
ProfileModel.hasOne(ExternalLinksModel, { foreignKey: 'profileID' });
ExternalLinksModel.belongsTo(ProfileModel, { foreignKey: 'profileID' });
console.log("ExternalLinksModel:", ExternalLinksModel);
//

const db = {};

const initialize = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      //Define your models here
        db.User = await new UserModel(sequelize, DataTypes);

        db.Post = await new PostModel(sequelize, DataTypes);
        
        db.Message = await new MessageModel(sequelize, DataTypes);

        db.Inbox = await new InboxModel(sequelize, DataTypes);

        db.MessageThread = await new MessageThreadModel(sequelize, DataTypes);

        db.Profile = await new ProfileModel(sequelize, DataTypes);

        db.ExternalLinks= await new ExternalLinksModel(sequelize, DataTypes);

      //Add any additional models here as needed
      // IE db.AnotherModel = require('./anothermodel')(sequelize, DataTypes);

      return { sequelize, db };
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return {};
    }
  };
module.exports = { initialize, sequelize, db };