const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

const {Thread}=require('./thread.js')

class Reply extends Model {}

Reply.init(
    {
        replyID:{
            field: 'replyID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },threadID: { 
            field: 'threadID',
            type: DataTypes.INTEGER, 
            references: { 
                model: Thread, 
                key: 'threadID' 
            }
        },date:{
            field: 'date',
            type:DataTypes.DATEONLY,
        },time:{
            field: 'time',
            type:DataTypes.TIME,
        },userName:{
            field: 'userName',
            type:DataTypes.STRING(255),
        },likes:{
            field: 'likes',
            type:DataTypes.INTEGER,
        },body:{
            field: 'body',
            type:DataTypes.TEXT,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Reply',
        tableName: 'reply',
    }
);


module.exports = Reply;