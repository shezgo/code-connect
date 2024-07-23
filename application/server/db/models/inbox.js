const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')

class Inbox extends Model {}

Inbox.init(
    {
        inboxID : {
            field: 'inboxID',
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
        },messageThreads:{
            field:'messageThreads',
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Inbox',
        tableName: 'inbox',
    }
);

module.exports = Inbox;