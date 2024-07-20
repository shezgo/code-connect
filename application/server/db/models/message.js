const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')

class Message extends Model {}

Message.init(
    {
        meetingID : {
            field: 'meetingID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },userID: { 
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },date:{
            type:DataTypes.DATE,
        },title:{
            type:DataTypes.STRING(256),
        },invitees:{
            type:DataTypes.JSON,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Message',
        tableName: 'message',
    }
);

module.exports = Message;