//paymentInfo
const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

class PaymentInfo extends Model {}

PaymentInfo.init(
    {
        paymentID:{
            field: 'paymentID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },cardNumber:{
            field: 'cardNumber',
            type:DataTypes.INTEGER,
        },cardName :{
            field: 'cardName',
            type:DataTypes.STRING,
        },zipCode:{
            field: 'zipCode',
            type:DataTypes.INTEGER,
        },backCode:{
            field: 'backCode',
            type:DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'PaymentInfo',
        tableName: 'paymentInfo',
    }
);


module.exports = PaymentInfo;