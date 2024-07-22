const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')
const {Notification}=require('./notification.js');

class UserNotification extends Model {}

UserNotification.init(
    {
        userNotificationID: {
            field: 'userNotificationID',
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
        },notificationID:{
            field:'notificationID',
            type:DataTypes.STRING,
            references: { 
                model: Notification, 
                key: 'notificationID' 
            },
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'UserNotification',
        tableName: 'userNotification',
    }
);

module.exports = UserNotification;