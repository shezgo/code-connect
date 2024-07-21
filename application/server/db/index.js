const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./config.js")

//Import models here
const UserModel = require('./models/user'); 
console.log("UserModel:", UserModel);

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

const PortfolioModel = require('./models/portfolio'); 
UserModel.hasOne(PortfolioModel, { foreignKey: 'userID' });
PortfolioModel.belongsTo(UserModel, { foreignKey: 'userID' });
console.log("PortfolioModel:", PortfolioModel);

const ProjectModel = require('./models/project'); 
PortfolioModel.hasMany(ProjectModel, { foreignKey: 'portfolioID' });
ProjectModel.belongsTo(PortfolioModel, { foreignKey: 'portfolioID' });
console.log("ProjectModel:", ProjectModel);

const PostModel = require('./models/post'); 
UserModel.hasMany(PostModel, { foreignKey: 'userID' });
PostModel.belongsTo(UserModel, { foreignKey: 'userID' });

console.log("PostModel:", PostModel);

const ForumThreadModel = require('./models/forumThread'); 
ForumThreadModel.hasMany(PostModel, { foreignKey: 'threadID' });
PostModel.belongsTo(ForumThreadModel, { foreignKey: 'threadID' });
console.log("ForumThreadModel:", ForumThreadModel);

const ForumModel = require('./models/forum'); 
console.log("ForumModel:", ForumModel);


//

const db = {};

const initialize = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      //Define your models here
        db.User = await new UserModel(sequelize, DataTypes);
        
        db.Message = await new MessageModel(sequelize, DataTypes);

        db.Inbox = await new InboxModel(sequelize, DataTypes);

        db.MessageThread = await new MessageThreadModel(sequelize, DataTypes);

        db.Profile = await new ProfileModel(sequelize, DataTypes);

        db.ExternalLinks = await new ExternalLinksModel(sequelize, DataTypes);

        db.Portfolio = await new PortfolioModel(sequelize, DataTypes);

        db.Project = await new ProjectModel(sequelize, DataTypes);
        
        db.Post = await new PostModel(sequelize, DataTypes);

        db.ForumThread = await new ForumThreadModel(sequelize, DataTypes);
        
        db.ForumModel = await new ForumModel(sequelize, DataTypes);

        const modelCount = Object.keys(db).length;
        console.log(`Number of models added: ${modelCount}`);
      //Add any additional models here as needed
      // IE db.AnotherModel = require('./anothermodel')(sequelize, DataTypes);

      return { sequelize, db };
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return {};
    }
  };
module.exports = { initialize, sequelize, db };