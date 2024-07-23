const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')
const {PaymentInfo}=require('./paymentInfo.js');

class UserPayment extends Model {}

UserPayment.init(
    {
        userPaymentID: {
            field: 'userPaymentID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementv: true
        },userID: { 
            field: 'userID',
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },paymentID:{
            field:'paymentID',
            type:DataTypes.STRING,
            references: { 
                model: PaymentInfo, 
                key: 'paymentID' 
            },
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'UserPayment',
        tableName: 'userPayment',
    }
);

module.exports = UserPayment;