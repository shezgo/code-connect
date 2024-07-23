const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

class Groups extends Model {}

Groups.init(
    {
        GroupsID:{
            field: 'GroupsID',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },mentorGroups:{
            field: 'mentorGroups',
            type:DataTypes.STRING,//Array of MentorGroup objects
        },groups:{
            field: 'groups',
            type:DataTypes.STRING,//Array of Group objects
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Groups',
        tableName: 'groups',
    }
);


module.exports = Groups;