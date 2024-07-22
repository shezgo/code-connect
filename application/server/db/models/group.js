const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

class Group extends Model {}

Group.init(
    {
        groupID:{
            field: 'groupID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },allMembers:{
            field: 'allMembers',
            type:DataTypes.STRING,
        },forum:{
            field: 'forum',
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Group',
        tableName: 'group',
    }
);


module.exports = Group;