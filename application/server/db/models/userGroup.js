const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const User=require('./user.js')
const {Group}=require('./group.js');

class UserGroup extends Model {}

UserGroup.init(
    {
        userGroupID:{
            field: 'userGroupID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },userID: { 
            field: 'userID',
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },groupID:{
            field:'groupID',
            type:DataTypes.STRING,
            references: { 
                model: Group, 
                key: 'groupID' 
            },
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'UserGroup',
        tableName: 'userGroup',
    }
);


module.exports = UserGroup;