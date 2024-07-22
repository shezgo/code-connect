const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {MentorUser}=require('./mentorUser.js')
const {MentorGroup}=require('./mentorGroup.js');

class UserMentorGroup extends Model {}

UserMentorGroup.init(
    {
        UserMentorGroupID: {
            field: 'UserMentorGroupID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementv: true
        },groupID: { 
            field: 'groupID',
            type: DataTypes.INTEGER, 
            references: { 
                model: MentorGroup, 
                key: 'groupID' 
            }
        },userID:{
            field:'userID',
            type:DataTypes.STRING,
            references: { 
                model: MentorUser, 
                key: 'userID' 
            },
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'UserMentorGroup',
        tableName: 'userMentorGroup',
    }
);

module.exports = UserMentorGroup;