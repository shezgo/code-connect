const {DataTypes} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const User=require('./user.js')

class UserHiring extends User {}

UserHiring.init(
    {
        userID:{
            field: 'userID',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: { 
                model: User, 
                key: 'userID' 
            }
        },company:{
            field: 'company',
            type:DataTypes.STRING,
        },position:{
            field: 'position',
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'UserHiring',
        tableName: 'userHiring',
    }
);


module.exports = UserHiring;