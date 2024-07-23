const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

class CodeChallenge extends Model {}

CodeChallenge.init(
    {
        challengeID:{
            field: 'challengeID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },title:{
            field: 'title',
            type:DataTypes.STRING,
        },description:{
            field: 'description',
            type:DataTypes.STRING,
        },language:{
            field: 'language',
            type:DataTypes.STRING,//symbol?
        },difficulty:{
            field: 'difficulty',
            type:DataTypes.STRING,//symbol?
        },codingBlock:{
            field: 'codingBlock',
            type:DataTypes.STRING,
        },deadline:{
            field: 'deadline',
            type:DataTypes.STRING,
        },completionPoints:{
            field: 'completionPoints',
            type:DataTypes.STRING,
        },solutions:{
            field: 'solutions',
            type:DataTypes.STRING,// array of ChallengeSubmission objects
        },codingTests:{
            field: 'codingTests',
            type:DataTypes.STRING,
        },pseudocodeHint:{
            field: 'pseudocodeHint',
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'CodeChallenge',
        tableName: 'codeChallenge',
    }
);


module.exports = CodeChallenge;