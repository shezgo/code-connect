const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {Portfolio}=require('./portfolio.js')

class Project extends Model {}

Project.init(
    {
        projectID:{
            field: 'projectID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },portfolioID: { 
            field: 'portfolioID',
            type: DataTypes.INTEGER, 
            references: { 
                model: Portfolio, 
                key: 'portfolioID' 
            }
        },link:{
            field: 'link',
            type:DataTypes.STRING,
        },desc:{
            field: 'desc',
            type:DataTypes.STRING,//text description of project 
        },title:{
            field: 'title',
            type:DataTypes.STRING,
        },pictures:{
            field: 'pictures',
            type:DataTypes.STRING,//file path 
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'Project',
        tableName: 'project',
    }
);


module.exports = Project;