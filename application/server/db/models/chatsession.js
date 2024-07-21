// const {DataTypes,Model} = require('sequelize');

// const sequelize = require("../config.js");

// //import for reference
// const {User}=require('./user.js')

// class Message extends Model {}

// Message.init(
//     {
//         meetingID : {
//             field: 'mett',
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrementv: true
//         },userID: { 
//             type: DataTypes.INTEGER, 
//             references: { 
//                 model: User, 
//                 key: 'userID' 
//             }
//         },date:{
//             field: 'mett',
//             type:DataTypes.DATE,
//         },title:{
//             field: 'mett',
//             type:DataTypes.STRING(256),
//         },invitees:{
//             field: 'mett',
//             type:DataTypes.JSON,
//         }
//     },
//     {
//         sequelize,
//         timestamps:false,
//         modelName: 'Message',
//         tableName: 'message',
//     }
// );

// module.exports = Message;