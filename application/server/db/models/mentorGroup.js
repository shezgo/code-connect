const {DataTypes} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const Group=require('./group.js')

const Groups=require('./groups.js')

class MentorGroup extends Group {}

MentorGroup.init(
    {
        groupID:{
            field: 'groupID',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: { 
                model: Group, 
                key: 'groupID' 
            }
        },mentorMembers:{
            field: 'mentorMembers',
            type:DataTypes.STRING,//Array of User 
        },groupsID: { 
            field: 'groupsID',
            type: DataTypes.INTEGER, 
            references: { 
                model: Groups, 
                key: 'groupsID' 
            }
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'MentorGroup',
        tableName: 'mentorGroup',
    }
);


module.exports = MentorGroup;