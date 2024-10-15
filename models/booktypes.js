// src/components/booktypes.js
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class BookTypes extends Model {}

    BookTypes.init(
        {
            BookTypeID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            BookTypeName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "BookTypes",
        }
    );

    return BookTypes;
};
