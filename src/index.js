const Sequelize = require("sequelize");
const config = require("./config/config.js");

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
db.BookStore = require("./components/bookstore.js")(sequelize, Sequelize);
db.Books = require("./components/books.js")(sequelize, Sequelize);
db.Customers = require("./components/customers.js")(sequelize, Sequelize);
db.Members = require("./components/members.js")(sequelize, Sequelize);
db.BookTypes = require("./components/booktypes.js")(sequelize, Sequelize);

module.exports = db;
