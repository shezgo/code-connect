const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

const Groups=require('./groups.js')

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
        modelName: 'Group',
        tableName: 'group',
    }
);


module.exports = Group;