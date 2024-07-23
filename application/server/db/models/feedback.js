const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {MentorUser}=require('./user.js')

class Feedback extends Model {}

Feedback.init(
    {
        feedbackID  : {
            field: 'feedbackID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementv: true
        },userID: { 
            field: 'userID',
            type: DataTypes.INTEGER, 
            references: { 
                model: MentorUser, 
                key: 'userID' 
            }
        },challengeSubID:{
            field:'challengeSubID',
            type: DataTypes.INTEGER, 
            // references: { 
            //     model: MentorUser, 
            //     key: 'userID' 
            // }
        },solutionSubmission :{
            field:'solutionSubmission',
            type:DataTypes.STRING,
        },organizationFeedback :{
            field:'organizationFeedback',
            type:DataTypes.STRING,
        },organizationScore :{
            field:'organizationScore',
            type:DataTypes.INTEGER,
        },logicFeedback :{
            field:'logicFeedback',
            type:DataTypes.STRING,
        },logicScore :{
            field:'logicScore',
            type:DataTypes.INTEGER,
        },commentFeedback :{
            field:'commentFeedback',
            type:DataTypes.STRING,
        },commentScore :{
            field:'commentScore',
            type:DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Feedback',
        tableName: 'feedback',
    }
);

module.exports = Feedback;