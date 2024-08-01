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
            type:DataTypes.STRING, //Use this as thread title b/c can't change datatype without db change
        },threadTitle:{
            field: 'threadTitle',
            type:DataTypes.STRING(255),//Use this for post content
        },date:{
            field: 'date',
            type:DataTypes.DATEONLY,
        },time:{
            field: 'time',
            type:DataTypes.TIME,
        },userName:{
            field: 'userName',
            type:DataTypes.STRING(255),
        },title:{
            field: 'title',
            type:DataTypes.STRING(255),
        },content:{
            field: 'content',
            type:DataTypes.TEXT,
        },topic:{
            field: 'topic',
            type:DataTypes.STRING(255),
        },likes:{
            field: 'likes',
            type:DataTypes.INTEGER,
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