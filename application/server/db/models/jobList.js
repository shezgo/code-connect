const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

const {User}=require('./user.js')

class JobList extends Model {}

JobList.init(
    {
        userID: { 
            field: 'userID',//user who posts the listing
            type: DataTypes.INTEGER, 
            references: { 
                model: User, 
                key: 'userID' 
            }
        },jobID:{
            field: 'jobID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },title:{
            field: 'title',
            type:DataTypes.STRING,
        },company:{
            field: 'company',
            type:DataTypes.STRING,
        },location:{
            field: 'location',
            type:DataTypes.STRING,
        },description:{
            field: 'description',
            type:DataTypes.STRING,
        },requirements:{
            field: 'requirements',
            type:DataTypes.STRING,
        },date:{
            field: 'date',
            type:DataTypes.DATE,
        },applicationLink:{
            field: 'applicationLink',
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'JobList',
        tableName: 'jobList',
    }
);


module.exports = JobList;