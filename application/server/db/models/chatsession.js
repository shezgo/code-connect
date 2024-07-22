const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')

class ChatSession extends Model {}

ChatSession.init(
    {
        chatSessionID : {
            field: 'chatSessionID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementv: true
        },userID: {  //from user who posted
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },date:{
            field: 'date',
            type:DataTypes.DATE,
        },title:{
            field: 'title',
            type:DataTypes.STRING,
        },invitees:{
            field: 'invitees',
            type:DataTypes.JSON,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'ChatSession',
        tableName: 'chatSession',
    }
);

module.exports = ChatSession;