const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

class Forum extends Model {}

Forum.init(
    {
        forumID:{
            field: 'forumID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },threadTitle:{
            field: 'threadTitle',
            type:DataTypes.STRING,
        },date:{
            field: 'date',
            type:DataTypes.DATEONLY,
        },time:{
            field: 'time',
            type:DataTypes.TIME,
        },access:{
            field: 'access',
            type:DataTypes.STRING(512),//List of members who have access
        },threads:{
            field: 'threads',
            type:DataTypes.STRING,//Array of ForumThread objects
        },isPublicForum:{
            field:"isPublicForum",
            type:DataTypes.BOOLEAN,
        },isPrivateForum:{
            field:"isPrivateForum",
            type:DataTypes.BOOLEAN,
        },threadContent:{
            field:'threadContent',
            type:DataTypes.STRING(1024),
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Forum',
        tableName: 'forum',
    }
);


module.exports = Forum;