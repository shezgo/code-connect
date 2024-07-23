const {DataTypes} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const Trophy=require('./trophy.js')

class SpecificTrophy extends Trophy {}

SpecificTrophy.init(
    {
        trophyID:{
            field: 'trophyID',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: { 
                model: Trophy, 
                key: 'trophyID' 
            }
        },hasTrophy :{
            field: 'hasTrophy',
            type:DataTypes.BOOLEAN,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'SpecificTrophy',
        tableName: 'specificTrophy',
    }
);


module.exports = SpecificTrophy;