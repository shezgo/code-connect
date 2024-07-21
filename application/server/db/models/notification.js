const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

class Notification extends Model {}

Notification.init(
    {
        notificationID:{
            field: 'notificationID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },title:{
            field: 'title',
            type:DataTypes.STRING,
        },redirectLink:{
            field: 'redirectLink',
            type:DataTypes.STRING,
        },date:{
            field: 'date',
            type:DataTypes.DATEONLY,
        },time:{
            field: 'time',
            type:DataTypes.TIME,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Notification',
        tableName: 'notification',
    }
);


module.exports = Notification;