const {sequelize} = require('../config/sqlConfig');
const {Sequelize,DataTypes} = require('sequelize');


const User = sequelize.define(
    "User",
    {
        userId : {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            unique: true
        },
        firstName : {
            type: DataTypes.STRING,
            allowNull : false
        },
        lastName : {
            type: DataTypes.STRING,
            allowNull : false
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        passwd: {
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tableName:'users',
        underscored: true
    }
)

module.exports = User;
