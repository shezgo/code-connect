const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

class AllEntities extends Model {}

AllEntities.init(
    {   
        entityId:{
            field:'entityId',
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        title:{
            field:'title',
            type:DataTypes.STRING
        },description:{
            field:'description',
            type:DataTypes.STRING
        },entityType:{
            field:'entityType',
            type:DataTypes.STRING,
            primaryKey: true
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'AllEntities',
        tableName: 'vw_AllEntities',
        doNotSync: true,
        ddl:`
        CREATE OR REPLACE VIEW vw_AllEntities
            AS
            SELECT 
                postId as entityId, 
                content as title, 
                null as description, 
                'post' as entityType 
            FROM post
            UNION ALL
            SELECT 
                challengeID as entityId,
                title as title,
                description  as description,
                'codeChallenge' as entityType 
            FROM codeChallenge;
        `
        
}
);

module.exports = AllEntities;