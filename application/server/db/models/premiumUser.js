 const {DataTypes} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const User=require('./user.js')

class PremiumUser extends User {}

PremiumUser.init(
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
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'PremiumUser',
        tableName: 'premiumUser',
    }
);


module.exports = PremiumUser;