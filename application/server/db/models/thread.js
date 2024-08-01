const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

const {Forum}=require('./forum.js')

class Thread extends Model {}

Thread.init(
    {
        threadID:{
            field: 'threadID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },forumID: { 
            field: 'forumID',
            type: DataTypes.INTEGER, 
            references: { 
                model: Forum, 
                key: 'forumID' 
            }
        },originalPoster:{
            field: 'originalPoster',
            type:DataTypes.STRING, //who started the thread
        },threadTitle:{
            field: 'threadTitle',
            type:DataTypes.STRING(255),
        },date:{
            field: 'date',
            type:DataTypes.DATEONLY,
        },time:{
            field: 'time',
            type:DataTypes.TIME,
        },userName:{
            field: 'userName',
            type:DataTypes.STRING(255),
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Thread',
        tableName: 'thread',
    }
);


module.exports = Thread;