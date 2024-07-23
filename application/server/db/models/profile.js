const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')

class Profile extends Model {}

Profile.init(
    {
        profileID:{
            field: 'profileID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },userID: { 
            field: 'userID',
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },isMentor:{
            field: 'isMentor',
            type:DataTypes.BOOLEAN,
        },biography:{
            field: 'biography',
            type:DataTypes.STRING(512),
        },resume:{
            field: 'resume',
            type:DataTypes.STRING(512),
        },portfolioID:{
            field: 'portfolioID',
            type: DataTypes.INTEGER, 
            // references: { 
            //     model: User, 
            //     key: 'userID' 
            // }
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Profile',
        tableName: 'profile',
    }
);


module.exports = Profile;