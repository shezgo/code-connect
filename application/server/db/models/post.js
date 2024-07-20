const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')

class Post extends Model {}

Post.init(
    {
        postID:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },userID: { 
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },content:{
            type:DataTypes.STRING(512),
        },codeBlock:{
            type:DataTypes.STRING(512),
        },date:{
            type:DataTypes.DATEONLY,
        },time:{
            type:DataTypes.TIME,
        },likes:{
            type:DataTypes.BOOLEAN,
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