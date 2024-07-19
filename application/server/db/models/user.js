const { crypto } = require("../../utils");
const { DataTypes, Model } = require('sequelize');
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
        email: {
            field: 'email',
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        /*username: {
            field: 'username',
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },*/
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
