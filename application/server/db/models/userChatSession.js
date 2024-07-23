const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')
const {ChatSession}=require('./chatSession.js');

class UserChatSession extends Model {}

UserChatSession.init(
    {
        userChatSessionID: {
            field: 'userChatSessionID',
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
        },chatSessionID:{
            field:'chatSessionID',
            type:DataTypes.STRING,
            references: { 
                model: ChatSession, 
                key: 'chatSessionID' 
            },
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'UserChatSession',
        tableName: 'userChatSession',
    }
);

module.exports = UserChatSession;