const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

const { User }=require('./user.js')

class Leaderboard extends Model {}

Leaderboard.init(
    {
        leaderboardID:{
            field: 'leaderboardID',
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
        },numPoints :{
            field: 'numPoints',
            type:DataTypes.INTEGER,
        },rankTitle:{
            field: 'rankTitle',
            type:DataTypes.STRING,
        },rankIcon:{
            field: 'rankIcon',
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Leaderboard',
        tableName: 'leaderboard',
    }
);



module.exports = Leaderboard;