const Sequelize = require("sequelize");
const config = require("../../config/config.js");


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
db.BookStore = require("../../models/bookstore.js")(sequelize, Sequelize);
db.Books = require("../../models/books.js")(sequelize, Sequelize);
db.Customers = require("../../models/customers.js")(sequelize, Sequelize);
db.Members = require("../../models/members.js")(sequelize); // Pass sequelize only
db.BookTypes = require("../../models/booktypes.js")(sequelize, Sequelize);

module.exports = db;
