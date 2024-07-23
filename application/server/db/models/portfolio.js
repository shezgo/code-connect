const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')

class Portfolio extends Model {}

Portfolio.init(
    {
        portfolioID:{
            field: 'portfolioID',
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
        },visibility:{
            field: 'visibility',
            type:DataTypes.BOOLEAN,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Portfolio',
        tableName: 'portfolio',
    }
);


module.exports = Portfolio;