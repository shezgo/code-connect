const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {User}=require('./user.js')

const {CodeChallenge}=require('./codeChallenge.js')

class ChallengeSub extends Model {}

ChallengeSub.init(
    {
        challengeSubID : {
            field: 'challengeSubID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementv: true
        },userID: { 
            field: 'userID',// who’s submitting the solution
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },challengeID: { 
            field: 'challengeID',//which coding challenge it’s submitted 
            type: DataTypes.INTEGER, 
            references: { 
                model: CodeChallenge, 
                key: 'challengeID' 
            }
        },codSub:{
            field:'codSub',
            type:DataTypes.STRING,//the code is submitted
        },date:{
            field:'date',
            type:DataTypes.DATEONLY,
        },time:{
            field:'time',
            type:DataTypes.TIME,
        },verifiedSolution:{
            field:'verifiedSolution',
            type:DataTypes.BOOLEAN,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'ChallengeSub',
        tableName: 'challengeSub',
    }
);

module.exports = ChallengeSub;