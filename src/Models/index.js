// kết nối CSDL
const { Sequelize } = require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(
  config.db_database,
  config.db_user,
  config.db_pass,
  {
    host: config.db_host,
    port: config.db_port,
    dialect: config.db_dialect,
  }
);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;

// Code first
// Database first

// yarn add sequelize-auto

// Lệnh để kéo hết table vào code
// yarn sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port] --dialect [dialect] -o [/path/to/models] -l es6

// yarn sequelize-auto -h localhost -d db_food -u root -x 1234 -p 3307 --dialect mysql -o src/Models -l es6
