const Sequelize = require("sequelize");
const config = require("../config/config.js");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models here
db.BookStore = require("./bookstore.js")(sequelize, Sequelize);
db.Books = require("./books.js")(sequelize, Sequelize);
db.Customers = require("./customers.js")(sequelize, Sequelize);
db.Members = require("./members.js")(sequelize, Sequelize);
db.BookTypes = require("./booktypes.js")(sequelize, Sequelize);

module.exports = db;
