const { crypto } = require("../../utils");
const { DataTypes, Model } = require('sequelize');
const {Rank}=require('./rank.js');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

const sequelize = require("../config.js");

class User extends Model { }

User.init(
    {   //This field cannot just be id, will generate errors
        userID: {
            field: 'userID',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            field: 'firstName',
            type: DataTypes.STRING,
        },
        lastName: {
            field: 'lastName',
            type: DataTypes.STRING,
        },
        userName: {
            field: 'userName',
            type: DataTypes.STRING,
            unique: true,
        },
        membershipType: {
            field: 'membershipType',
            type: DataTypes.STRING,
        },
        email: {
            field: 'email',
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            field: 'password',
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            field: 'salt',
            type: DataTypes.STRING,
            allowNull: true
        },
        emailVerified: {
            field: 'emailVerified',
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        resetPasswordToken: {
            field: 'resetPasswordToken',
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordExpires: {
            field: 'resetPasswordExpires',
            type: DataTypes.DATE,
            allowNull: true
        },
        points: {
            field: 'points',
            type: DataTypes.INTEGER,
        },
        rankID: {
            field: 'rankID',
            type: DataTypes.INTEGER,
            references: { 
                model: Rank, 
                key: 'rankID' 
            }
        },
        challengesCompleted: {
            field: 'challengesCompleted',
            type: DataTypes.INTEGER,
        },
        numChallengesCompleted: {
            field: 'numChallengesCompleted',
            type: DataTypes.INTEGER,
        },
        allTrophies: {
            field: 'allTrophies',
            type: DataTypes.INTEGER,
        },
        streakChallenge: {
            field: 'streakChallenge',
            type: DataTypes.INTEGER,
        },
        coins: {
            field: 'coins',
            type: DataTypes.INTEGER,
        },
        mentees: {
            field: 'mentees',
            type: DataTypes.JSON,
        },
        notificationList: {
            field: 'notificationList',
            type: DataTypes.JSON,
        },
        bookmarks: {
            field: 'bookmarks',
            type: DataTypes.STRING,
        },
        numPosts: {
            field: 'numPosts',
            type: DataTypes.INTEGER,
        },
        groups : {
            field: 'groups',
            type: DataTypes.JSON,
        },
        groupsMentored: {
            field: 'groupsMentored',
            type: DataTypes.JSON,
        },
        isPremium : {
            field: 'isPremium',
            type: DataTypes.BOOLEAN,
        },isMentor  : {
            field: 'isMentor',
            type: DataTypes.BOOLEAN,
        },pendingMentor  : {
            field: 'pendingMentor',
            type: DataTypes.BOOLEAN,
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        /*
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }*/
    }
);

// Custom class methods
User.authenticate = async function (email, password) {
    const user = await User.findOne({
        where: {
            email: email,
            emailVerified: true
        }
    });

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        return user;
    }
    return null;
};

module.exports = User;
