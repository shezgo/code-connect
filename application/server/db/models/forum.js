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
        },link:{
            field:'link',
            type:DataTypes.STRING(1024),
        },date:{
            field: 'date',
            type:DataTypes.DATEONLY,
        },time:{
            field: 'time',
            type:DataTypes.TIME,
        },isPublicForum:{
            field:"isPublicForum",
            type:DataTypes.BOOLEAN,
        },isPrivateForum:{
            field:"isPrivateForum",
            type:DataTypes.BOOLEAN,
        },title:{
            field: 'title',
            type:DataTypes.STRING(1024),
        },topic:{
            field: 'topic',
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