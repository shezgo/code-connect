const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

const {User}=require('./user.js')

class Trophy extends Model {}

Trophy.init(
    {
        name:{
            field: 'name',
            type:DataTypes.STRING,
        },trophyID:{
            field: 'trophyID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },description :{
            field: 'description',
            type:DataTypes.STRING,
        },trophyFlag:{
            field: 'trophyFlag',
            type:DataTypes.BOOLEAN,
        },userID :{
            field: 'userID',
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },checkRequirements:{
            field: 'checkRequirements',
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Trophy',
        tableName: 'trophy',
    }
);


module.exports = Trophy;