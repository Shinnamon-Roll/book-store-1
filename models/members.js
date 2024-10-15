// src/components/members.js
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Members extends Model {}

    Members.init(
        {
            // Define your attributes here
            MemberID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Point: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            JoinDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            MembershipLevel: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Members",
        }
    );

    return Members;
};
