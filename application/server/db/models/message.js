const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')

class Message extends Model {}

Message.init(
    {
        messageID: {
            field: 'messageID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },userID: { 
            field: 'userID',
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },sendingUser:{
            field: 'sendingUser',
            type:DataTypes.STRING,
        }, receivingUser:{
            field: 'receivingUser',
            type:DataTypes.STRING,
        },time:{
            field: 'time',
            type:DataTypes.TIME,
        },date:{
            field: 'date',
            type:DataTypes.DATE,
        },content:{
            field:'content',
            type:DataTypes.STRING,
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