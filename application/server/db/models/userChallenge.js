const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')
const {CodeChallenge}=require('./codeChallenge.js');

class UserChallenge extends Model {}

UserChallenge.init(
    {
        userChallengeID : {
            field: 'userChallengeID',
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
        },challengeID:{
            field:'challengeID',
            type:DataTypes.STRING,
            references: { 
                model: CodeChallenge, 
                key: 'challengeID' 
            },
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'UserChallenge',
        tableName: 'userChallenge',
    }
);

module.exports = UserChallenge;