const {DataTypes} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const Group=require('./group.js')

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