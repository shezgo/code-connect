const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {Message}=require('./message.js')

class MessageThread extends Model {}

MessageThread.init(
    {
        messageThreadID:{
            field: 'messageThreadID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },messageID: { 
            field: 'messageID',
            type: DataTypes.INTEGER, 
            references: { 
                model: Message, 
                key: 'messageID' 
            }
        },participatingUsers:{
            field: 'participatingUsers',
            type:DataTypes.STRING(512),
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'MessageThread',
        tableName: 'messageThread',
    }
);


module.exports = MessageThread;