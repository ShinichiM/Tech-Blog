const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    }
}, 
{
    hooks: {
        async beforeCreate(newUserData) {
            newUserData.password = bcrypt.hash(newUserData, 10);
        },
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = bcrypt.hash(updatedUserData, 10);
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports = User;