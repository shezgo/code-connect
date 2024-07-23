 const {DataTypes} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const PremiumUser=require('./premiumUser.js')

class MentorUser extends PremiumUser {}

MentorUser.init(
    {
        userID:{
            field: 'userID',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: { 
                model: PremiumUser, 
                key: 'userID' 
            }
        },feedbackCompleted :{
            field: 'feedbackCompleted',
            type:DataTypes.STRING,//Array of FeedbackForm 
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'MentorUser',
        tableName: 'mentorUser',
    }
);


module.exports = MentorUser;