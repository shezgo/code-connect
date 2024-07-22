// submissionShare
const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./message.js')

class SubmissionShare extends Model {}

SubmissionShare.init(
    {
        shareID:{
            field: 'shareID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },userID: { 
            field: 'userID',
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },likes:{
            field: 'likes',
            type:DataTypes.INTEGER,
        },Comments:{
            field: 'Comments',
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'SubmissionShare',
        tableName: 'submissionShare',
    }
);


module.exports = SubmissionShare;