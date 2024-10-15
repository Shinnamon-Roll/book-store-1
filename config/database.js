const { Sequelize } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',  // Or the database server host
  dialect: 'postgres', // You are using PostgreSQL
  logging: false,      // Disable Sequelize logging, optional
  pool: {
    max: 5,            // Maximum number of connection in the pool
    min: 0,            // Minimum number of connection in the pool
    acquire: 30000,    // Maximum time (ms) Sequelize will try to get connection
    idle: 10000        // Maximum time (ms) connection can be idle before being released
  }
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
