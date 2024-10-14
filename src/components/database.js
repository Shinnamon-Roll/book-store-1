const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database_name", "Shinnamon", "chimonkung2547as", {
    host: "localhost",
    dialect: "postgres", // or any other database dialect you're using
});

module.exports = sequelize;
