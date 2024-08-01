module.exports = (sequelize, DataTypes) => {
    const UserForum = sequelize.define('UserForum', {
        userForumID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        forumID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    UserForum.associate = models => {
        UserForum.belongsTo(models.User, { foreignKey: 'userID' });
        UserForum.belongsTo(models.Forum, { foreignKey: 'forumID' });
    };

    return UserForum;
};