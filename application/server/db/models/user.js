const {crypto} = require("../../utils")
const {DataTypes, Model } = require('sequelize');

const sequelize = require("../config.js")

class User extends Model {}

User.init(
    {
    id: {
        field: 'id',
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
    }
    },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    hooks: {
        beforeCreate: user => {
            const { hash, salt } = crypto.createPasswordHash(user.password);
            user.salt = salt;
            user.password = hash;
        },
        beforeUpdate: user => {
            if (user.changed('password')) {
                const { hash, salt } = crypto.createPasswordHash(user.password);
                user.password = hash;
                user.salt = salt;
            }
        }
    }
  },
);
User.authenticate = async function authenticate(email, password) {
    const user = await User.findOne({
        where: {
            email: email,
            emailVerified: true
        }
    });

    if (!user) {
        return null;
    }

    const { hash } = crypto.createPasswordHash(password, user.salt);
    if (hash === user.password) {
        return user;
    }
    return null;
};
module.exports =  User
