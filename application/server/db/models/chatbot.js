const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const UserHiring = require('./userHiring.js')

class Chatbot extends Model {}

Chatbot.init(
    {
        chatbotID:{
            field: 'chatbotID',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },userID:{
            field: 'userID',
            type: DataTypes.INTEGER,
            references: { 
                model: UserHiring, 
                key: 'userID' 
            }
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Chatbot',
        tableName: 'chatbot',
    }
);


module.exports = Chatbot;