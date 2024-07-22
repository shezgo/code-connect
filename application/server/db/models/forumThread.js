const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

const {Forum}=require('./forum.js')

class ForumThread extends Model {}

ForumThread.init(
    {
        threadID:{
            field: 'threadID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },originalPoster:{
            field: 'originalPoster',
            type:DataTypes.STRING, //who started the thread
        },threadTitle:{
            field: 'threadTitle',
            type:DataTypes.STRING,
        },posts:{
            field: 'codeBlock',
            type:DataTypes.STRING(512),
        },date:{
            field: 'date',
            type:DataTypes.DATEONLY,
        },time:{
            field: 'time',
            type:DataTypes.TIME,
        },forumID: { 
            field: 'forumID',
            type: DataTypes.INTEGER, 
            references: { 
                model: Forum, 
                key: 'forumID' 
            }
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'ForumThread',
        tableName: 'forumThread',
    }
);


module.exports = ForumThread;