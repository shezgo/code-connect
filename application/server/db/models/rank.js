const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

const {Ranks}=require('./ranks.js')

class Rank extends Model {}

Rank.init(
    {
        icon:{
            field: 'icon',
            type:DataTypes.STRING,//path
        },title:{
            field: 'title',
            type:DataTypes.STRING,//symbol
        },rankID:{
            field: 'rankID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },ranksID:{
            field: 'ranksID',
            type:DataTypes.INTEGER,
            references: { 
                model: Ranks, 
                key: 'ranksID' 
            },
        },pointsRange:{
            field: 'pointsRange',
            type:DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Rank',
        tableName: 'rank',
    }
);


module.exports = Rank;