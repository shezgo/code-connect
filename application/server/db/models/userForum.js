
const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')
const {Forum}=require('./forum.js');

class UserForum extends Model {}

UserForum.init(
    {
        userForumID: {
            field: 'userForumID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementv: true
        },userID: { 
            field: 'userID',
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },forumID:{
            field:'forumID',
            type:DataTypes.INTEGER,
            references: { 
                model: Forum, 
                key: 'forumID' 
            }
        },
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'UserForum',
        tableName: 'userForum',
    }
);

module.exports = UserForum;

