//SupportForm 
const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')
const {UserHiring}=require('./userHiring.js')

class SupportForm extends Model {}

SupportForm.init(
    {
        supportFormID: {
            field: 'supportFormID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementv: true
        },from_userID: { 
            field: 'from_userID',
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },to_userID:{
            field:'to_userID',
            type:DataTypes.INTEGER,
            references: { 
                model: UserHiring, 
                key: 'userID' 
            },
        },data:{
            field:'data',
            type:DataTypes.DATEONLY,
        },time:{
            field:'time',
            type:DataTypes.TIME,
        },message:{
            field:'message',
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'SupportForm',
        tableName: 'supportForm',
    }
);

module.exports = SupportForm;