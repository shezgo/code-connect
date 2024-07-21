const {DataTypes,Model} = require('sequelize');

const sequelize = require("../config.js");

//import for reference
const {Profile}=require('./profile.js')

class ExternalLinks extends Model {}

ExternalLinks.init(
    {
        externalLinksID:{
            field: 'externalLinksID',
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },profileID: { 
            field: 'profileID',
            type: DataTypes.INTEGER, 
            references: { 
                model: Profile, 
                key: 'profileID' 
            }
        },xLogo:{
            field: 'xLogo',
            type:DataTypes.STRING,
        },linkedinLogo:{
            field: 'linkedinLogo',
            type:DataTypes.STRING,
        },instagramLogo:{
            field: 'instagramLogo',
            type:DataTypes.STRING,
        },tiktokLogo:{
            field: 'tiktokLogo',
            type:DataTypes.STRING,
        },facebookLogo:{
            field: 'facebookLogo',
            type:DataTypes.STRING,
        },xLink:{
            field: 'xLink',
            type:DataTypes.STRING,
        },linkedinLink:{
            field: 'linkedinLink',
            type:DataTypes.STRING,
        },instagramLink:{
            field: 'instagramLink',
            type:DataTypes.STRING,
        },tiktokLink:{
            field: 'tiktokLink',
            type:DataTypes.STRING,
        },facebookLink:{
            field: 'facebookLink',
            type:DataTypes.STRING,
        },hasX:{
            field: 'hasX',
            type:DataTypes.BOOLEAN,
        },hasLinkedin:{
            field: 'hasLinkedin',
            type:DataTypes.BOOLEAN,
        },hasInstagram:{
            field: 'hasInstagram',
            type:DataTypes.BOOLEAN,
        },hasTiktok:{
            field: 'hasTiktok',
            type:DataTypes.BOOLEAN,
        },hasFacebook:{
            field: 'hasFacebook',
            type:DataTypes.BOOLEAN,
        }
    },
    {
        sequelize,
        timestamps:false,
        modelName: 'ExternalLinks',
        tableName: 'externalLinks',
    }
);


module.exports = ExternalLinks;