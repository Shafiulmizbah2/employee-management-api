const mysql = require("mysql");

const connectionObj = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  multipleStatements: true,
};

const connection = mysql.createConnection(connectionObj);

module.exports = connection;
