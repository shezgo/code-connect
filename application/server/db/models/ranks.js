const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

class Ranks extends Model {}

Ranks.init(
    {
        ranksID:{
            field: 'ranksID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },Collection :{
            field: 'Collection',
            type:DataTypes.STRING,
        },checkRequirements :{
            field: 'checkRequirements',
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Ranks',
        tableName: 'ranks',
    }
);


module.exports = Ranks;