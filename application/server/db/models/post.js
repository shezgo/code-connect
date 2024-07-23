const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')

const {ForumThread}=require('./forumThread.js')

class Post extends Model {}

Post.init(
    {
        postID:{
            field: 'postID',
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
        },content:{
            field: 'content',
            type:DataTypes.STRING(512),
        },comments:{
            field: 'comments',
            type:DataTypes.STRING(512),
        },codeBlock:{
            field: 'codeBlock',
            type:DataTypes.STRING(512),
        },date:{
            field: 'date',
            type:DataTypes.DATEONLY,
        },time:{
            field: 'time',
            type:DataTypes.TIME,
        },likes:{
            field: 'likes',
            type:DataTypes.BOOLEAN,
        },threadID: { 
            field: 'threadID',
            type: DataTypes.INTEGER, 
            references: { 
                model: ForumThread, 
                key: 'threadID' 
            }
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Post',
        tableName: 'post',
    }
);


module.exports = Post;